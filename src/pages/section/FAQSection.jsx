import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const FAQS=[
  {
    question:"How long does delivery take?",
    answer:"Orders placed before 4 PM are delivered the same day within Dhaka. Outside Dhaka, delivery usually takes 1–2 days.",
  },
  {
    question:"Do you deliver outside Dhaka?",
    answer:"Yes, we deliver to most major cities across Bangladesh. Delivery charges and timing vary by location and are shown at checkout.",
  },
  {
    question:"What's your return or refund policy?",
    answer:"If your flowers arrive damaged or wilted, contact us within 24 hours with a photo and we'll send a replacement or issue a full refund.",
  },
  {
    question:"How can I track my order?",
    answer:"Once your order ships, you'll get a status update in your account under Orders. You can check the current stage there anytime.",
  },
  {
    question:"What payment methods do you accept?",
    answer:"We accept major cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery in select areas.",
  },
];

const FAQItem=({faq,isOpen,onToggle})=>(
  <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen?"border-primary/30 bg-white shadow-lg":"border-gray-100 bg-white hover:border-primary/20 hover:shadow-md"}`}>
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      aria-expanded={isOpen}
    >
      <span className="text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
        {faq.question}
      </span>

      <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${isOpen?"bg-primary text-white rotate-45":"bg-gray-100 text-gray-500"}`}>
        <FiPlus size={18}/>
      </span>
    </button>

    <div className={`grid transition-all duration-300 ${isOpen?"grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">
        <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
          <p className="text-sm leading-7 text-gray-600">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const FAQSection=()=>{
  const [openIndex,setOpenIndex]=useState(0);

  return(
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Questions, Answered
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Find quick answers about delivery, payments, refunds, and order tracking. 
            Still need help? Our team is always here for you.
          </p>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {FAQS.map((faq,i)=>(
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex===i}
              onToggle={()=>setOpenIndex(openIndex===i?-1:i)}
            />
          ))}
        </div>

        {/* Bottom Support Box */}
        <div className="mx-auto mt-14 max-w-2xl rounded-3xl bg-gray-900 px-6 py-8 text-center text-white shadow-xl">
          <h3 className="text-xl font-bold">
            Still have questions?
          </h3>
          <p className="mt-2 text-sm text-gray-300">
            Our support team is ready to help you anytime.
          </p>

          <button className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;