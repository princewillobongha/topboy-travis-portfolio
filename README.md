# TopBoy Travis Portfolio

Portfolio for **Princewill Obongha — AI Developer**.

## Included
- Responsive portfolio frontend
- Project showcase with live links
- GitHub and X links
- AI development workflow
- Skills and capabilities
- Résumé page
- Working contact-form endpoint for Vercel
- Resend email integration

## Deploy on Vercel
1. Upload the project to a GitHub repository.
2. Import the repository into Vercel.
3. Add environment variables:
   - `RESEND_API_KEY` — your Resend API key
   - `CONTACT_FROM` — a sender address from a verified Resend domain
4. Deploy.

The contact form sends enquiries to `Princewillobongha@gmail.com` and uses the visitor's email as Reply-To.

## Important
The public frontend never contains the Resend API key. Keep secrets only in Vercel Environment Variables.
