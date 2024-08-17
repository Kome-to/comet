// import { TextField } from '@mui/material';
// import React from 'react';
// import withFormikField from '../../common/utils/withFormikField';
// import classNames from 'classnames';
// import Svg, { SvgName } from '../Svg/Svg';

// interface TextInputProps {
//   className?: string;
//   label?: string;
//   placeholder?: string;
//   error?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   onlyChangeOnBlur?: boolean;
//   value: string | number | readonly string[] | undefined;
// }

// const TextInput: React.FC<TextInputProps> = ({
//   className = '',
//   label = '',
//   placeholder = '',
//   error,
//   onFocus,
//   onChange,
//   onBlur,
//   onlyChangeOnBlur,
//   value,
//   ...rest
// }) => {
//   const [inputValue, setValue] = React.useState(value);

//   const classes = classNames(className, 'mt-4 mb-2');

//   const helperText = error ? (
//     <>
//       <Svg className="w-[14px] mt-[-2px] ml-[-8px] mr-1 inline" name={SvgName.INFO} />
//       {error}
//     </>
//   ) : (
//     ''
//   );

//   React.useEffect(() => {
//     setValue(value);
//   }, [value]);

//   const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     if (onFocus) {
//       onFocus(e);
//     }
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.persist();
//     if (onlyChangeOnBlur && onChange) {
//       onChange(e);
//     }
//     if (onBlur) {
//       setTimeout(() => {
//         onBlur(e);
//       }, 0);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
//     if (!onlyChangeOnBlur && onChange) {
//       onChange(e);
//     }
//   };

//   return (
//     <div>
//       <div className={classes}>
//         <TextField
//           value={inputValue}
//           onBlur={handleBlur}
//           onChange={handleChange}
//           onFocus={handleFocus}
//           fullWidth
//           error={!!error}
//           helperText={helperText}
//           id="outlined-multiline-flexible"
//           label={label}
//           placeholder={placeholder}
//           variant="outlined"
//           {...rest}
//         />
//       </div>
//     </div>
//   );
// };

// export const FormikTextInput = withFormikField(TextInput);

// export default TextInput;
