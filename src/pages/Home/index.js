import { useState } from 'react';
import Column from './Column';
import TaskCard from './TaskCard';
import FiltersBar from './FiltersBar';
import React from 'react';
import { Board } from './Board';
function Home() {
    
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [isUpdate,setIsUpdate] = useState(false);
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-grow overflow-hidden">
                <main className="flex-grow overflow-auto p-4 sm:p-6">
                    <FiltersBar selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} update={setIsUpdate}/>
                    <Board isUpdate={isUpdate} selectedUserId={selectedUserId} setIsUpdate={setIsUpdate} />
                </main>
            </div>
        </div>
    );
}

export default Home;
