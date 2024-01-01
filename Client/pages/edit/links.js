import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/userContext";
import DashboardHeader from "@/components/dashboardHeader";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function profile() {
    const { UserData, setUserData } = useContext(UserContext);
    const [links, setLinks] = useState([]);
    const [deletedLinkInfo, setDeletedLinkInfo] = useState(null); // Store the deleted link and its index
    const router = useRouter();

    useEffect(() => {
        setLinks(UserData?.links)
    }, [UserData]);

    function HandleLinksChange(e, index, field) {
        setLinks(prevLinks => {
            const updatedLinks = [...prevLinks];
            updatedLinks[index] = { ...updatedLinks[index], [field]: e };
            return updatedLinks;
        });
    }

    function HandleLinksDelete(index) {
        setDeletedLinkInfo({ link: links[index], index });

        setLinks(prevLinks => {
            return prevLinks.filter((_, i) => i !== index);
        });
    }

    function AddNewLinks() {
        setLinks(prevLinks => {
            const updatedLinks = [...prevLinks];
            updatedLinks.push({ title: '', url: '' });
            return updatedLinks;
        });
    }

    function handleUndoDelete() {
        if (deletedLinkInfo) {
            const { link, index } = deletedLinkInfo;
            setLinks(prevLinks => {
                const updatedLinks = [...prevLinks];
                updatedLinks.splice(index, 0, link); // Insert the deleted link back at its original index
                return updatedLinks;
            });
            setDeletedLinkInfo(null);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!localStorage.getItem('Token')) {
            return router.push('/login')
        }

        fetch('http://localhost:8000/edit/links', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Token: localStorage.getItem('Token'), links }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Somting went Wrong");
                }
                toast.success("Links Updated Succesfully");
                return res.json();
            })
            .then((res) => {
                setUserData(res.data)
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    return (
        <div className="h-full max-w-full flex flex-col gap-5 bg-gray-100 p-10">
            <DashboardHeader avatar={UserData?.avatar} handle={UserData?.name} />
            <main className="pb-5 flex items-center  flex-col gap-5 border border-2 bg-[#eeeeee] border-solid rounded-xl pt-5 gap-10">
                <section className="flex flex-col items-center gap-3 w-10/12">
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 pb-3">
                        {links?.map((link, index) => (
                            <div key={index} className="flex gap-3 items-center bg-white border-2 border-gray-100 text-black shadow-lg p-2 rounded-lg autofocus">
                                <div className="flex gap-3 flex-col w-9/12">
                                    <span className="flex gap-2 items-center bg-white border-2 border-gray-100 text-black p-2 rounded-lg autofocus">
                                        <TextFieldsIcon />
                                        <input onChange={(e) => HandleLinksChange(e.target.value, index, "title")} value={link.title} className="focus:outline-none w-full" type="text" placeholder='Set Title' />
                                    </span>
                                    <span className="flex gap-2 items-center bg-white border-2 border-gray-100 text-black p-2 rounded-lg autofocus">
                                        <InsertLinkIcon />
                                        <input onChange={(e) => HandleLinksChange(e.target.value, index, "url")} value={link.url} className="focus:outline-none w-full" type="text" placeholder='Set URL' />
                                    </span>
                                </div>
                                <button type='button' onClick={() => HandleLinksDelete(index)} className="grow bg-red-500 hover:bg-red-700 text-white font-medium p-2 rounded-lg">
                                    <DeleteForeverIcon />
                                    <span>Delete</span>
                                </button>
                            </div>
                        ))}
                        {deletedLinkInfo && (
                            <div className="bg-[#00a2ff] flex items-center justify-center gap-1 grow hover:bg-[#0b80c4] text-white w-4/12 self-center rounded-lg font-medium shadow-lg mt-2">
                                <button onClick={handleUndoDelete} className="p-2 flex items-center justify-center gap-1">
                                    <ReplayIcon />
                                    <span>Undo Deleted Links</span>
                                </button>
                            </div>
                        )}
                        <div className="flex flex-row gap-5">
                            <button onClick={AddNewLinks} type='button' className="bg-blue-700 flex items-center justify-center gap-1 grow hover:bg-blue-600  text-white w-4/12 p-2 self-center rounded-lg font-medium shadow-lg mt-2">
                                <AddIcon />
                                <span>Add New Link</span>
                            </button>
                            <button type='submit' className="bg-[#089637] grow hover:bg-[#0c7e32] text-white w-4/12 p-2 self-center rounded-lg font-medium shadow-lg mt-2">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
