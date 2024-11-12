import Question from "./Question";

type Props = {};

const Questions = ({}: Props) => {
  return (
    <div
      className="max-w-none sm:max-w-[1060px] mx-auto w-full py-16"
      id="FAQs"
    >
      <div className="w-full sm:w-4/5 mx-auto flex gap-4 px-4 sm:px-0 flex-col">
        <p>You have questions?</p>
        <h2>
          Check out the <b className="text-accent">FAQs</b>
        </h2>
        <Question
          question={"What are the working hours?"}
          answer={
            "Working hour will be dependent on each branches. General rule is 45 Hours per week, 6 days."
          }
        />
        <Question
          question={"What is the hiring process like?"}
          answer={
            "Our hiring process typically includes an initial resume screening and one or more interviews (which may include a technical assessment for certain roles)."
          }
        />
        <Question
          question={"Do you have an internship program?"}
          answer={
            "We do not as of November 2023, but we are open to any internship requests. We will arrange the appropriate procedures for candidates that requested an internship."
          }
        />
        <Question
          question={"Do you have any tips for the interview process?"}
          answer={
            "We recommend that candidates familiarize themselves with our company and products, and be prepared to discuss their experiences or skills that are related to the positions. Most important, just be yourself."
          }
        />
        <p className="mt-8">
          You have specific questions? Email us at{" "}
          <a
            href={"mailto:contact@idealtech.com.my"}
            className="text-accent underline"
          >
            contact@idealtech.com.my
          </a>
        </p>
      </div>
    </div>
  );
};

export default Questions;
