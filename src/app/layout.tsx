import type{Metadata}from"next";import"./globals.css";
export const metadata:Metadata={title:"FolioWiki",description:"Turn your Google Drive into an open-source wiki."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
