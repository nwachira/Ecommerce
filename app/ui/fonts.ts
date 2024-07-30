import { Lusitana, Dosis } from "next/font/google";


export const lusitana = Lusitana({
    subsets: ['latin'],
    weight: ["400", "700"],
    variable: "--font-lusitana",
    display: "swap",

})

export const dosis = Dosis ({
    subsets: ['latin'],
    weight: ["400", "700"],
    variable: "--font-dosis",
    display: "swap",
})
