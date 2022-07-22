import React, { useState, useEffect } from 'react'
import Loading from './loading';
import GithubUsers from "./githubUsers";
function UseEffectAPI() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            setLoading(false);
            setUsers(await response.json());
        } catch (error) {
            setLoading(false);
            console.log("my error is " + error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <GithubUsers users={users} />
        </>
    );
}

export default UseEffectAPI