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
            project_scope,
            design_request,
            project_type,
            estimated_total

        } = req.body;



        const { data, error } = await resend.emails.send({

            from: "AS TechSolution <onboarding@resend.dev>",

            to: [
                "astechsolution.my@gmail.com"
            ],


            subject: `New Website Inquiry - ${client_name}`,


            html: `

            <h2>New Website Inquiry - AS TechSolution</h2>

            <p><b>Name:</b> ${client_name}</p>

            <p><b>Phone:</b> ${client_phone}</p>

            <p><b>Project Type:</b> ${project_type}</p>

            <p><b>Estimated Budget:</b> ${estimated_total}</p>

            <hr>

            <p><b>Project Scope:</b></p>
            <p>${project_scope}</p>


            <p><b>Design Request:</b></p>
            <p>${design_request}</p>

            `

        });



        if(error){

            console.log(error);

            return res.status(500).json({

                success:false,
                error:error.message

            });

        }



        return res.status(200).json({

            success:true,
            message:"Email sent successfully",
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