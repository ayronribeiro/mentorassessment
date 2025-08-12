import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'

export const metadata = {
  title: 'Mentor Assessment',
  description: 'Created with v0',
  icons: {
    icon: '/mentor-academy-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1274615750766903'); // Your Pixel ID
            fbq('track', 'PageView'); // Fires on every load

            // Fires when someone lands on the information page
            fbq('trackCustom', 'InfoPageView');

            // If this is the page where they actually submit info, fire CompleteRegistration
            // Call this AFTER form submission is confirmed
            function trackInfoSubmitted(){
              fbq('track', 'CompleteRegistration', {
                content_name: 'Mentor Quiz Info Page'
              });
            }
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1274615750766903&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
