"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateInquiry } from "@/lib/validation.mjs";
import { business } from "@/lib/business";
import { sendInquiry } from "@/lib/formsubmit.mjs";

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
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [status, setStatus] = useState("");
  const [enhanced, setEnhanced] = useState(false);
  const busy = useRef(false);
  const started = useRef(Date.now());
  const requestId = useRef("");
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
    if (busy.current || state === "success") return;
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
    setStatus("Sending your inquiry… Please keep this page open.");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: started.current, requestId: requestId.current }),
        signal: AbortSignal.timeout(25000),
      });
      const validation = await response.json();
      if (!response.ok || validation.validated !== true) {
        setErrors(validation.errors || {});
        throw new Error(
          validation.error ||
            "We could not confirm submission. Your details are still here. Please try again or email me.",
        );
      }
      await sendInquiry(result.clean, business.email);
      setState("success");
      form.reset();
      setStatus(
        "Thank you! FormSubmit accepted your inquiry for delivery. I’ll reply using the contact details you provided. A consultation time has not been reserved yet.",
      );
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      busy.current = false;
      setState("error");
      setStatus(
        error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError"
          ? error.message
          : "We could not confirm submission because the connection timed out. Your details are still here. Please retry or email me.",
      );
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form
      className="inquiry-form"
      action="/api/inquiries"
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
        Send your inquiry here. You’ll see its submission status on this page.
      </p>
      <noscript>Please enable JavaScript to send this form, or email {business.email}.</noscript>
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
          className={"form-status" + (state === "success" ? " success" : "")}
          role={state === "error" ? "alert" : "status"}
        >
          {status}
        </div>
      )}
      <button className="button" type="submit" disabled={!enhanced || state === "loading" || state === "success"}>
        {state === "loading"
          ? "Sending your inquiry…"
          : state === "success" ? "Inquiry submitted" : "Send consultation inquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <div className="privacy" id="privacy">
        <h3>How your details are used</h3>
        <p>
          Your details are used to review your inquiry and reply to you. They
          are sent through FormSubmit to {business.email}. FormSubmit processes
          the submission and retains submissions
          in its archive for 30 days. This website does not store inquiries in a
          database or add you to a marketing list. Temporary rate-limit records help reduce spam. Please avoid sharing
          passwords or sensitive information.
        </p>
        <a className="text-link" href="https://formsubmit.co/privacy.pdf">
          FormSubmit privacy policy ↗
        </a>
      </div>
    </form>
  );
}
