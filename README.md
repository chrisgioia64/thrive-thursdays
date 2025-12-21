# Thrive Thursdays Website

A single-page website for Thrive Thursdays, built with Tailwind CSS and vanilla JavaScript.
The live website is located at [Thrive Thursdays](http://www.thrivethursdays.net)

## Weekly Checklist
During the summer months, every week we should make the following content changes.


## Services

### [Domain Registrar (Namecheap)](https://ap.www.namecheap.com/domains/domaincontrolpanel/thrivethursdays.net/domain)

Login with username `kensington64`. Password stored in Enpass.

The nameservers should be set to Cloudflare
<img width="912" height="156" alt="image" src="https://github.com/user-attachments/assets/61f01fe1-a881-42af-999f-62074ec500bc" />

### [DNS (Cloudflare)](https://dash.cloudflare.com/a07c26590e4fead788d6ff0927e5be72/thrivethursdays.net/dns/records)

Login using Google.
The CNAME records should point to the Railway hosting url. Keep the orange icon (proxied) on, and ignore the warning that this hostname is not covered by a certificate.
<img width="1276" height="345" alt="image" src="https://github.com/user-attachments/assets/89ad766b-6687-497b-984b-0a3c02740520" />


### [Hosting (Railway)](https://railway.com/project/dc549166-96fe-4d8b-afea-c91a48fe4204?)

Login using github. We are using the $5/month [Hobby Plan](https://railway.com/pricing).

[Web Url](https://thrive-thursdays-production.up.railway.app)

- Click on the Thrive Thursday service, and this will bring up a Control Panel consisting of the tabs "Deployments", "Variables", "Metrics", and "Settings".
- <img width="831" height="284" alt="image" src="https://github.com/user-attachments/assets/bb624e87-5fa8-4ab3-8e5f-658944a3eff7" />
- A common misconception is that it is sufficient to point Cloudflare DNS records to your production Railway at thrive-thursdays-production.up.railway.app. However, we need to add a custom domain (for both www and the root domain) so that Railway knows to accept requests from Cloudflare.
- Go to the `Settings` tab and go to the `Networking` section. Click on the "Custom Domain" button. Use port 8080. After clicking Ok, you should get a modal dialog like this showing the value. Copy this value and paste it into Cloudflare.
- <img width="976" height="231" alt="image" src="https://github.com/user-attachments/assets/22665b3b-3662-47e0-9413-30272b9e8ef2" />
- This is what the Networking Section under Settings tab of the Control Panel should look like after you have finished:
- <img width="635" height="405" alt="image" src="https://github.com/user-attachments/assets/01b41916-82e5-43ea-af11-619e70095f57" />
- Verify that both www.thrivethursdays.net and [thrivethursdays.net](http://thrivethursdays.net) both work without any issue.

