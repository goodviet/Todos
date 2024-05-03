
import React, { useEffect, useState } from 'react';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Icon,
    Label,
    Menu,
    Table,} from 'semantic-ui-react'

//IMPORT SERIVCE
import { deleteUser, getData, } from '../service/user.service';
import ModalExampleCloseIcon from './ModalAdd';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';



const TableList = (props) => {


    const numberOfCells = 3;
    const nameColumn = [ 'Name', 'Descriptsion', 'Setting'];

    // state
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    


    const renderTableHeaderCells = () => {

        const cells = [];
        for (let i = 0; i < numberOfCells; i++) {
            cells.push(<TableHeaderCell key={i}>{nameColumn[i]}</TableHeaderCell>);
        }
        return cells;
    };


    useEffect(() => {
        getUser()
     
    }, [currentPage]);

    const totalPages = Math.ceil(listUser.length / itemsPerPage);
 
    // PAGINATION
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // CREATE PAGINATION
    const renderPaginationItems = () => {
        const paginationItems = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <MenuItem key={i} as='a' active={i === currentPage} onClick={() => handlePageChange(i)}>
                    {i}
                </MenuItem>
            );
        }
        return paginationItems;
    };

    // Add new user - todo
    const handleUserAdded = (newUser) => {
        setListUser(prevListUser => [...prevListUser, newUser]);
    };

    //DELETE USER
    const handleDeleteUser = async (_id) => {
        await deleteUser(_id);
        setListUser(prevListUser => prevListUser.filter(user => user._id !== _id));
    }

    //GET DATA IN TABLE
    const handleGetData = async (last_name, email) =>{
        return {last_name, email}
    }

    //Data
    const getUser = async (page) => {
        let res = await getData();
        if (res && res.data && res.data.listUser) {
            setListUser(res.data.listUser)
        }
    }


    
    return (

        <>
            <ModalExampleCloseIcon addNewUser={handleUserAdded} />

            <Table celled>
                <TableHeader>
                    <TableRow>
                        {renderTableHeaderCells()}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {listUser.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='name-cell'>
                                <Label>{item.name}</Label>
                          
                            </TableCell>
                            <TableCell className='description'>
                                {item.email || item.description}
                            </TableCell>
                            <TableCell className='status-cell'>
                                <div>

                                    <ModalUpdate handleGetData={handleGetData} name={item.name} description = {item.description} _id= {item._id} />
                                    <ModalDelete  handleDeleteUser={handleDeleteUser} id={item._id} />
                                    
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <MenuItem as='a' icon onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    <Icon name='chevron left' />
                                </MenuItem>
                                {renderPaginationItems()}
                                <MenuItem as='a' icon onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    <Icon name='chevron right' />
                                </MenuItem>
                            </Menu>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
};

export default TableList;