"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateInquiry } from "@/lib/validation.mjs";
import { business } from "@/lib/business";

const fields = [
  ["name", "Full name", "text", true],
  ["email", "Email address", "email", true],
  ["business", "Business name", "text", true],
  ["website", "Website URL", "url", false],
  ["phone", "Phone number", "tel", false],
  ["goal", "Main business goal or marketing challenge", "textarea", true],
  ["message", "Message", "textarea", true],
] as const;

export default function InquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [status, setStatus] = useState("");
  const [enhanced, setEnhanced] = useState(false);
  const busy = useRef(false);
  const started = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnhanced(true);
    const restore = () => {
      busy.current = false;
      setState("idle");
      setStatus("");
      started.current = Date.now();
    };
    window.addEventListener("pageshow", restore);
    return () => window.removeEventListener("pageshow", restore);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = validateInquiry(data);
    setErrors(result.errors);
    if (Object.keys(result.errors).length) {
      form
        .querySelector<HTMLElement>(
          '[name="' + Object.keys(result.errors)[0] + '"]',
        )
        ?.focus();
      return;
    }
    busy.current = true;
    setState("loading");
    setStatus("Checking your details before opening secure submission…");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: started.current }),
        signal: AbortSignal.timeout(12000),
      });
      const validation = await response.json();
      if (!response.ok || validation.validated !== true) {
        setErrors(validation.errors || {});
        throw new Error(
          validation.error ||
            "Please try again or contact me by email. Your inquiry has not been sent.",
        );
      }
      for (const [name, value] of Object.entries(result.clean)) {
        const field = form.elements.namedItem(name) as
          HTMLInputElement | HTMLTextAreaElement | null;
        if (field) field.value = value;
      }
      setStatus(
        "Opening FormSubmit. Complete its security check to finish sending your inquiry.",
      );
      // Native POST retains FormSubmit's built-in CAPTCHA and provider result page.
      // Validation is not delivery: this site never announces success here.
      HTMLFormElement.prototype.submit.call(form);
    } catch (error) {
      busy.current = false;
      setState("error");
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The connection timed out. Please retry or email me. Your inquiry has not been sent.",
      );
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form
      className="inquiry-form"
      action={`https://formsubmit.co/${business.email}`}
      method="POST"
      onSubmit={submit}
      noValidate={enhanced}
      id="consultation"
    >
      <input
        type="hidden"
        name="_subject"
        value="New consultation inquiry — Digital Bhupendra"
      />
      <input type="hidden" name="_template" value="table" />
      <p className="eyebrow">FREE CONSULTATION INQUIRY</p>
      <h2>Start your free marketing plan.</h2>
      <p className="small">
        Fields marked * are required. This form requests a consultation; it does
        not reserve a time.
      </p>
      <p className="small">
        After sending, complete FormSubmit’s security check. It will show the
        submission result.
      </p>
      <div className="form-grid">
        {fields.map(([name, label, type, required]) => (
          <div
            className={"field " + (type === "textarea" ? "full" : "")}
            key={name}
          >
            <label htmlFor={name}>
              {label}
              {required ? " *" : " (optional)"}
            </label>
            {type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                rows={name === "goal" ? 3 : 4}
                required={required}
                maxLength={name === "goal" ? 2000 : 5000}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? name + "-error" : undefined}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                required={required}
                maxLength={
                  {
                    name: 120,
                    email: 254,
                    business: 160,
                    website: 500,
                    phone: 40,
                  }[name]
                }
                autoComplete={
                  {
                    name: "name",
                    email: "email",
                    business: "organization",
                    website: "url",
                    phone: "tel",
                  }[name]
                }
                placeholder={
                  name === "website" ? "https://example.com" : undefined
                }
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? name + "-error" : undefined}
              />
            )}
            {errors[name] && (
              <span className="field-error" id={name + "-error"}>
                {errors[name]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="companyFax">Leave this blank</label>
        <input id="companyFax" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>
      {status && (
        <div
          ref={statusRef}
          tabIndex={-1}
          className="form-status"
          role={state === "error" ? "alert" : "status"}
        >
          {status}
        </div>
      )}
      <button className="button" type="submit" disabled={state === "loading"}>
        {state === "loading"
          ? "Opening secure submission…"
          : "Send consultation inquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <div className="privacy" id="privacy">
        <h3>How your details are used</h3>
        <p>
          Your details are used to review your inquiry and reply to you. They
          are sent through FormSubmit to {business.email}. FormSubmit processes
          the submission, uses CAPTCHA to reduce spam, and retains submissions
          in its archive for 30 days. This website does not store inquiries in a
          database or add you to a marketing list. Please avoid sharing
          passwords or sensitive information.
        </p>
        <a className="text-link" href="https://formsubmit.co/privacy.pdf">
          FormSubmit privacy policy ↗
        </a>
      </div>
    </form>
  );
}
