import clsx from 'clsx';
import { BsCart3 } from "react-icons/bs";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'bg-gradient-to-r from-gray-500 to-gray-700 transition-all duration-200 text-white  py-1 px-4 rounded-xl flex items-center gap-3 group',
        className,
      )}
    >
        <span  className="group-hover:block hidden transition-all duration-900 ease-in-out">
        {children}
        </span>
        <BsCart3 className="text-xl text-white drop-shadow-sm cursor-pointer"/>

       
      
    </button>
  );
}