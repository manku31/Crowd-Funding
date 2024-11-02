interface CustomButtonProps {
  btnType: string;
  title: string;
  styles: string;
  handleClick?: () => void;
}

export default function CustomButton({
  btnType,
  title,
  handleClick,
  styles,
}: CustomButtonProps) {
  return (
    <button
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
