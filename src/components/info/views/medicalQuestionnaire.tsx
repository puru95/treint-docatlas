import React, { useState } from 'react';

interface Question {
  sequence_no: number;
  question: string;
  options: string[];
}

interface Props {
  // data: {
  //   total_questions: number;
  //   user_id: number;
  //   thread_id: string;
  //   ques_data: Question[];
  // };
  data: Question[];
  handleSubmitAnswers: (answers: any) => void;
}

const MedicalQuestionnaire: React.FC<Props> = ({ data, handleSubmitAnswers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [customAnswer, setCustomAnswer] = useState('');

  const currentQuestion = data[currentIndex];

  const handleOptionSelect = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.sequence_no]: option,
    });
    setCustomAnswer(option);
  };

  const handleCustomAnswerSubmit = () => {
    if (!customAnswer.trim()) return;
    setAnswers({
      ...answers,
      [currentQuestion.sequence_no]: customAnswer.trim(),
    });
    setCustomAnswer('');

    currentIndex == (data.length - 1) ? handleSubmitAnswers(answers) : nextQuestion();

  };

  const nextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('All answers:', answers);
      // You can send this to your backend
      // axios.post('/api/save-answers', { thread_id: data.thread_id, answers });
    }
  };
  console.log({ answers })
  return (
    <div className="w-full mx-auto p-6 shadow-lg min-h-[55vh] rounded-lg border border-gray-400">
      <h2 className="text-xl font-bold mb-2">
        Question {currentQuestion.sequence_no}
      </h2>
      <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>

      <span className='text-xs text-gray-500 mb-1'>Suggestions</span>
      <div className="flex flex-wrap gap-2 mb-4 w-fit">
        {currentQuestion.options.map((opt, idx) => {
          const cleanedOpt = opt.replace(/^- /, '').trim();

          if (cleanedOpt.toLowerCase() === 'other (please specify)') {
            return null; // Skip rendering this option
          }

          return (
            <button
              key={idx}
              className="w-fit text-xs font-semibold whitespace-nowrap h-8 tracking-wide text-left border border-gray-400 bg-gray-800 rounded-md px-4 py-2 hover:bg-gray-600"
              onClick={() => handleOptionSelect(cleanedOpt)}
            >
              {cleanedOpt}
            </button>
          );
        })}
      </div>

      <div className="mb-6 w-2/5">
        {/* <input
          type="text"
          placeholder="write your custom answer here..."
          value={customAnswer}
          onChange={(e) => setCustomAnswer(e.target.value)}
          className="w-full px-4 h-10 text-sm border rounded text-gray-700"
        /> */}
        <textarea placeholder="Write your answer here..."
          value={customAnswer}
          onChange={(e) => setCustomAnswer(e.target.value)} className="w-full px-4 py-2 h-20 mt-2 text-sm border rounded-md text-gray-700" />
      </div>
      <button
        onClick={handleCustomAnswerSubmit}
        className="bg-[#00A3FF] text-white w-1/5 text-sm font-semibold px-4 h-10 rounded-md hover:bg-blue-600"
      >
        {currentIndex == (data.length - 1) ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default MedicalQuestionnaire;
