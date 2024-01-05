'use client';
import styles from './new.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ProfileClient() {

  const { user, error, isLoading } = useUser();
  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [rows, setRows] = React.useState([]);

React.useEffect(() => {
    if(!isLoading && user==null){
        window.location.href = "http://localhost:3001/api/auth/login";
    }
    if(user!=null){
      localStorage.setItem("name",user.email);
      getData();
    }
}, [user]);

const getData=async()=>{
    await axios.get('http://localhost:3000/api/score').then((res) => {
        setRows(res.data);
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
    const logout = () => {
        window.location.href = "http://localhost:3001/api/auth/logout";
    };
  return (
    <div>
    {user && (
      <div className={styles.new}>
        <Modal classNames={styles.modal} open={open} onClose={onCloseModal} center>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
            {rows.length==0?<Tr>
                <Td>NO DATA</Td>
                <Td>NO DATA</Td>
            </Tr>: rows.map((row,key) => (
              <Tr key={key}>
                <Td>{row.name}</Td>
                <Td>{row.score}</Td>
              </Tr>
            ))}
              
            </Tbody>
          </Table>
        </Modal>
        <img src={user.picture} className={styles.dp} alt={user.name} />
        <h2 className={styles.name}>Welcome back {user.name}!</h2>
        <button className={styles.highb} onClick={onOpenModal}> HIGH SCORE </button>
        <button className={styles.highb} onClick={logout}> LOG OUT </button>
      </div>
    )}
    </div>
  );
}