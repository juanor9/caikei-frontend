// // get all storages
//   useEffect(() => {
//     if (publisher) {
//       try {
//         dispatch(getLibrariesByPublisher(publisher));
//         dispatch(getPublisherById(publisher));
//       } catch (error) {
//         throw new Error(error);
//       }
//     }
//   }, [publisher]);
//   const { library } = useSelector((state) => state.library);
//   const publisherData = useSelector((state) => state.publisher.publisher);
//   const [storages, setStorages] = useState([]);
//   useEffect(() => {
//     if (Array.isArray(library)) {
//       setStorages([...storages, ...library, publisherData]);
//     }
//   }, [library, publisherData]);
//   const storagesSelect = storages.map((storage) => ({
//     value: storage._id,
//     label: storage.name,
//   }));

//   // Para ReactSelect From
//   const [selectedFrom, setselectedFrom] = useState({
//     value: '63e0f2f8b7fbc17be761a93a',
//     label: 'Tanuki',
//   });
//   const handleChangeFrom = (selected) => {
//     setselectedFrom(selected);
//   };
//     // Para ReactSelect To
//   const [selectedTo, setselectedTo] = useState(null);
//   const handleChangeTo = (selected) => {
//     setselectedTo(selected);
//   };
//   console.log(selectedTo);
