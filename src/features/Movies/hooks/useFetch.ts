// 'use client'
// import React, { useEffect, useState } from 'react'

// export default function useFetch(url: string) {


//     const [isLoading, setLoading] = useState<boolean>(false)
//     const [refetch, setRefetch] = useState<boolean>(false)
//     const [error, setrror] = useState('')
//     const [data, setData] = useState([])




//     const oneFtch = async () => {
//         try {


//             setLoading(true)
//             const reseponseResult: any = await fetch(url)

//             if (!reseponseResult?.oke) {
//                 setrror('there is error fetching')
//                 setLoading(false)
//             }
//             const respo = await reseponseResult.json()

//             setData(respo)
//             setLoading(false)
//         } catch (error) {

//         }
//     }

//     useEffect(() => {
//         oneFtch()
//     }, [url, refetch])



//     return { data, isLoading, error, setRefetch }
// }



// const { } = oneFtch('googlapi')