import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import { faqs } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="section faq">
      <div className="container faq__inner reveal">
        <div className="faq__intro">
          <p className="eyebrow">A FEW HELPFUL ANSWERS</p>
          <h2>
            {"Before "}
            <br />
            {"we "}
            <em>begin.</em>
          </h2>
          <p className="faq__more">
            Have a different question?
            <br />
            <a className="link-arrow" href={site.phone.href}>
              Give Dominic a call.
            </a>
          </p>
        </div>
        <div className="faq__list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq__item">
              <summary className="faq__question">
                <span>{faq.question}</span>
                <span className="faq__icon" aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </summary>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
