import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);



export default async function handler(req, res) {


    if (req.method !== "POST") {

        return res.status(405).json({

            message: "Method not allowed"

        });

    }



    try {


        const {

            client_name,
            client_phone,
            client_email,
            project_scope,
            design_request,
            project_type,
            estimated_total


        } = req.body;



        // ==========================
        // EMAIL TO AS TECHSOLUTION
        // ==========================


        const { data, error } = await resend.emails.send({


            from: "AS TechSolution <onboarding@resend.dev>",


            to: [

                "astechsolution.my@gmail.com"

            ],



            subject: `New Website Inquiry - ${client_name}`,



            html: `


<!DOCTYPE html>

<html>

<body style="
margin:0;
padding:0;
background:#f5f7fb;
font-family:Arial,Helvetica,sans-serif;
">


<div style="
max-width:650px;
margin:40px auto;
background:white;
border-radius:16px;
overflow:hidden;
border:1px solid #e5e7eb;
">


<div style="
background:#0f172a;
padding:30px;
color:white;
">


<h1 style="
margin:0;
font-size:24px;
">

AS TechSolution

</h1>


<p style="
margin-top:8px;
color:#38bdf8;
">

New Website Inquiry

</p>


</div>




<div style="
padding:30px;
">


<h2>
Client Information
</h2>


<p>
<b>Name:</b><br>
${client_name}
</p>


<p>
<b>Phone:</b><br>
${client_phone}
</p>


<p>
<b>Email:</b><br>
${client_email || "Not provided"}
</p>



<hr style="
border:none;
border-top:1px solid #ddd;
margin:25px 0;
">



<h2>
Project Details
</h2>


<p>
<b>Project Type:</b><br>
${project_type}
</p>



<p>
<b>Estimated Budget:</b><br>
${estimated_total}
</p>




<p>
<b>Project Scope:</b>
</p>


<div style="
background:#f8fafc;
padding:15px;
border-radius:10px;
">

${project_scope}

</div>





<p style="
margin-top:20px;
">

<b>Design Request:</b>

</p>



<div style="
background:#f8fafc;
padding:15px;
border-radius:10px;
">


${design_request}


</div>



</div>



<div style="
background:#0f172a;
padding:20px;
color:#94a3b8;
text-align:center;
font-size:13px;
">


AS TechSolution<br>

Website Development & Digital Solutions


</div>



</div>



</body>

</html>


`

        });




        if(error){


            console.log(error);


            return res.status(500).json({

                success:false,

                error:error.message

            });


        }





        // ==========================
        // AUTO REPLY CUSTOMER
        // ==========================


        if(client_email){


            await resend.emails.send({


                from:"AS TechSolution <onboarding@resend.dev>",


                to:[

                    client_email

                ],



                subject:"Thank you for contacting AS TechSolution",




                html:`


<!DOCTYPE html>

<html>

<body style="
background:#f5f7fb;
font-family:Arial;
padding:30px;
">


<div style="
max-width:600px;
margin:auto;
background:white;
padding:35px;
border-radius:15px;
">


<h2 style="
color:#0f172a;
">

Thank you for contacting AS TechSolution

</h2>



<p>
Hi ${client_name},
</p>



<p>

Thank you for contacting AS TechSolution.

We have received your project inquiry and our team will review your requirements.

</p>



<p>

We will get back to you shortly with the next steps and suitable solution for your project.

</p>



<br>



<p>

Regards,

<br>

<b>
AS TechSolution Team
</b>

</p>



</div>


</body>

</html>


`

            });


        }




        return res.status(200).json({


            success:true,


            message:"Emails sent successfully",


            data


        });



    } catch(error){



        console.log(error);



        return res.status(500).json({


            success:false,


            error:error.message


        });



    }


}