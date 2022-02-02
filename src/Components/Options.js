import react from 'react'

export default function Options({options}){
  return (
   options.map((option,index) =>
               <option key={option.name} value={index}>
               {option.name}
               </option>)
  );
}
