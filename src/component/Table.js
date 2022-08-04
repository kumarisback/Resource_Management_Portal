import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useTable, usePagination } from 'react-table'
export default function Table({ columns, data ,handleDelete}) {

    let nav=useNavigate();
    const [itemSelected, setItemSelected] = useState(false)
    let arr = [];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    )


    return (
        <>
            <table {...getTableProps()} className={"table"}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    if (!isNaN(cell.value)) {
                                        return <td onClick={e => {
                                            
                                            let index = arr.indexOf(e.target.value);
                                            if (arr.includes(e.target.value) && index >-1) {
                                                setItemSelected(false)
                                                arr.splice(index, 1);
                                            }
                                            else{
                                                
                                                arr.push(e.target.value)
                                            }
                                            if(arr.length>0) {setItemSelected(true)};
                                        }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    }

                                    else return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>

                <div>
                    <button type="button" style={{ backgroundColor: "#2DCA73" }} onClick={e=>nav("/additem")}  disabled={itemSelected} className="btn">ADD ITEM</button>
                    <button type="button" style={{ backgroundColor: "#FF0B37" }} onClick={()=>{handleDelete(arr); arr=[]}} disabled={!itemSelected} className="btn ">Delete</button>
                </div>
                <div className="pagination" style={{ display: "flex", marginLeft: "60%", justifyContent: "space-around" }}>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>

            </div>
        </>
    )
}
