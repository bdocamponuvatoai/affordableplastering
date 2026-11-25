import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import { faqs } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="section faq-section">
      <div className="container faq-layout reveal">
        <div>
          <p className="eyebrow">A FEW HELPFUL ANSWERS</p>
          <h2>
            {"Before "}
            <br />
            {"we "}
            <em>begin.</em>
          </h2>
          <p>
            Have a different question?
            <br />
            <a className="text-link" href={site.phone.href}>
              Give Dominic a call.
            </a>
          </p>
        </div>
        <div className="faqs">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <Icon name="plus" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
