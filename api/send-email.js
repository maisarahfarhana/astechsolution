export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }


    const {
        client_name,
        client_phone,
        project_scope,
        design_request,
        project_type,
        estimated_total
    } = req.body;


    const emailContent = `
New Website Inquiry - AS TechSolution

Name:
${client_name}

Phone:
${client_phone}

Project Type:
${project_type}

Estimated Budget:
${estimated_total}

Project Scope:
${project_scope}

Design Request:
${design_request}
    `;


    // temporary response test
    return res.status(200).json({
        success: true,
        message: emailContent
    });

}