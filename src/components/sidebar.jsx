import { useState} from 'react';

export default function Sidebar() {
    const [sidebarOpen, setSideBarOpen] = useState(false)

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen)
    };

    return(
        <>
            <div className={`sidepanel ${!sidebarOpen ? 'w-0' : 'w-[20%]'}`}>
                <button onClick={handleViewSidebar} className="sidepanel-close-button">&#215;</button>
                <button className="sidepanel-button mt-2">Create Training</button>
                <button className="sidepanel-button">Edit/Delete Exercise</button>
                <button className="sidepanel-button">Edit/Delete Training</button>
            </div>

            {!sidebarOpen &&
                <button onClick={handleViewSidebar}
                        className="hamburger">
                            &#9776;
                </button>}
        </>
    )
}