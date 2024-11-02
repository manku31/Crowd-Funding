interface FormFieldProps {
  lableName: string;
  placeholder: string;
  inputType: string;
  value: string;
  isTextArea?: boolean;
  handelChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function FormField({
  lableName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handelChange,
}: FormFieldProps) {
  return (
    <label className="flex-1 w-full flex flex-col text-white">
      {lableName && <span>{lableName}</span>}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handelChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:py-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handelChange}
          type={inputType}
          placeholder={placeholder}
          step="0.1"
          className="py-[15px] sm:py-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
}
