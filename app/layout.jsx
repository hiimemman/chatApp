
import './globals.css'


const metadata = {
  title: 'Homepage',
  description: 'Homepage to chatAPP',
  viewport: 'width=device-width, initial-scale=1.0',
  content: "viewport-fit=cover",
}



export default function RootLayout({ children }) {


  return (
    <html lang="en"> 
      <body>
     
    {children}
      </body>
    </html>
  )
}