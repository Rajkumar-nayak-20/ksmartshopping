// // const verifyEmailTemplate = ({name,url})=>{
// //     return`
// // <p>Dear ${name}</p>    
// // <p>Thank you for registering Binkeyit.</p>   
// // <a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
// //     Verify Email
// // </a>
// // `
// // }

// // export default verifyEmailTemplate



// const verifyEmailTemplate = ({ name, url }) => {
//   return `
//   <div style="font-family:Arial, sans-serif">
//     <p>Dear ${name},</p>

//     <p>Thank you for registering with Binkeyit.</p>

//     <a href="${url}" 
//        style="
//          display:inline-block;
//          padding:12px 20px;
//          background:orange;
//          color:black;
//          text-decoration:none;
//          font-weight:600;
//          margin-top:10px;
//        ">
//       Verify Email
//     </a>

//     <p>If you did not create this account, please ignore this email.</p>

//     <p>Thanks,<br/>Binkeyit Team</p>
//   </div>
//   `;
// };

// export default verifyEmailTemplate

const verifyEmailTemplate = ({ name, url }) => {
  return `
  <div style="font-family: Arial, sans-serif; line-height:1.6;">
    <p>Dear ${name},</p>

    <p>Thank you for registering with <b>Binkeyit</b>.</p>

    <a href="${url}" target="_blank"
       style="
         display:inline-block;
         padding:12px 20px;
         background:orange;
         color:black;
         text-decoration:none;
         font-weight:600;
         margin-top:10px;
         border-radius:6px;
       ">
      Verify Email
    </a>

    <p>If you did not create this account, please ignore this email.</p>

    <p>Thanks,<br/>Binkeyit Team</p>
  </div>
  `;
};

export default verifyEmailTemplate;
