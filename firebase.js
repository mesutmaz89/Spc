import {
db
} from "./firebase-config.js";

import {

collection,

addDoc,

setDoc,

doc,

getDocs,

deleteDoc,

updateDoc,

query,

orderBy,

onSnapshot,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const COLLECTION = "spc_records";

let unsubscribe = null;



export async function pushRecord(record){

    try{

        const r = structuredClone(record);

        r.ts = r.ts || Date.now();

        await setDoc(

            doc(db,COLLECTION,String(record.id)),

            r,

            { merge:true }

        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function deleteRecordById(id){

    try{

        await deleteDoc(

            doc(db,COLLECTION,String(id))

        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function addRecord(record){

    try{

        const r = structuredClone(record);

        r.createdAt = serverTimestamp();

        await addDoc(
            collection(db,COLLECTION),
            r
        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function updateRecord(id,data){

    try{

        await updateDoc(
            doc(db,COLLECTION,id),
            data
        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function removeRecord(id){

    try{

        await deleteDoc(
            doc(db,COLLECTION,id)
        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function saveRecord(id,data){

    try{

        await setDoc(

            doc(db,COLLECTION,id),

            data,

            {

                merge:true

            }

        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function loadRecords(){

    try{

        const q = query(

            collection(db,COLLECTION),

            orderBy("ts","desc")

        );

        const snap = await getDocs(q);

        const list = [];

        snap.forEach(d=>{

            const rid = isNaN(Number(d.id)) ? d.id : Number(d.id);

            list.push({

                id:rid,

                ...d.data()

            });

        });

        return list;

    }

    catch(e){

        console.error(e);

        return [];

    }

}



export function watchRecords(callback){

    if(unsubscribe){

        unsubscribe();

    }

    const q = query(

        collection(db,COLLECTION),

        orderBy("ts","desc")

    );

    unsubscribe = onSnapshot(

        q,

        snap=>{

            const list=[];

            snap.forEach(d=>{

                const rid = isNaN(Number(d.id)) ? d.id : Number(d.id);

                list.push({

                    id:rid,

                    ...d.data()

                });

            });

            callback(list);

        }

    );

}



export function stopWatching(){

    if(unsubscribe){

        unsubscribe();

        unsubscribe=null;

    }

}



export async function syncLocalStorage(){

    try{

        const local = JSON.parse(

            localStorage.getItem("fik1_data") || "[]"

        );



        for(const item of local){

            await pushRecord(item);

        }



        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}



export async function downloadCloudBackup(){

    const list = await loadRecords();

    localStorage.setItem(

        "fik1_data",

        JSON.stringify(list)

    );

    return list;

}



export async function uploadCloudBackup(){

    const local = JSON.parse(

        localStorage.getItem("fik1_data") || "[]"

    );



    for(const item of local){

        await pushRecord(item);

    }

}



window.addEventListener(

    "online",

    ()=>{

        uploadCloudBackup();

    }

);



window.addEventListener(

    "offline",

    ()=>{

        console.log("Offline Mode");

    }

);