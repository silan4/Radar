import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useSelector } from "react-redux";


const ListView = ({openModal}) => {
  const state = useSelector((store) => store.flight);
  
  // gösterilecek ilk elemanın dizideki sırası
  const [itemOffset, setItemOffset] = useState(0);

  // sayfa abaişına eleman sayısı
  const itemsPerPage = 10;

  // gösterilecek sonuncu elemanın dizideki yeri 
  const endOffset = itemOffset + itemsPerPage;
 
  // belirlenen aralıktaki elamanları seçme
  const currentItems = state.flights.slice(itemOffset, endOffset);
 
  // toplam sayfa  sayısını bulma
  const pageCount = Math.ceil(state.flights.length / itemsPerPage);
  
  // her yeni sayfa seçtiğinde bunu state' e aktarır
  const handlePageClick = (event) => {
    const newOffset = 
    (event.selected * itemsPerPage);

    setItemOffset(newOffset);
  };


  return (
    <div className="p-5">
      <table className="table table-dark table-hover mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) =>
             <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => openModal(flight.id)}>
                  Detay
                </button>
              </td> 
             </tr>
            )}
        </tbody>
      </table>
    
      <ReactPaginate
        breakLabel="..."
        nextLabel="ileri >"
        className="pagination"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< geri"
      />

    </div>
  )
}

export default ListView