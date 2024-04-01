import { useState, useEffect } from 'react'
import { AddIcon, ViewIcon, EditIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Tooltip
} from "@chakra-ui/react";
import { SearchBar } from './components/SearchAlbunsBar'
import { ModalNewAlbum } from './components/ModalAddAlbum';
import { ModalEditAlbum } from './components/ModalEditAlbum';
import { ModalNewMusic } from './components/ModalAddMusic';
import { MusicModal } from './components/ModalViewMusics';
import axios from 'axios';
import { useToast } from "@chakra-ui/toast";


function App() {
  const { isOpen: isAlbumModalOpen, onOpen: onAlbumModalOpen, onClose: onAlbumModalClose } = useDisclosure();
  const { isOpen: isEditAlbumModalOpen, onOpen: onEditAlbumModalOpen, onClose: onEditAlbumModalClose } = useDisclosure();
  const { isOpen: isMusicModalOpen, onOpen: onMusicModalOpen, onClose: onMusicModalClose } = useDisclosure();
  const { isOpen: isViewMusicsModalOpen, onOpen: onViewMusicsModalOpen, onClose: onViewMusicsModalClose } = useDisclosure();
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const toast = useToast()

  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  })

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:8000/albums', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setData(response.data);
      setFilteredData(response.data)
      localStorage.setItem("albums", JSON.stringify(response.data));
    } catch (err) {
      console.error('Erro ao buscar os álbuns: ', err);

      const erro = err.response.data.error
      toast({
        title: "Erro ao buscar os albuns",
        description: erro,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    fetchAlbums();
  }, []);

  const searchData = (searchTerm) => {
    const filteredResults = data.filter(album => album.album_name.includes(searchTerm.toUpperCase()))
    console.log(typeof (filteredResults))
    setFilteredData(filteredResults)
  }

  const handleRemove = async (albumId) => {
    try {
      //removendo album localmente antes de chamar a api
      const newArray = data.filter((item) => item.id !== albumId)
      setData(newArray)
      setFilteredData(newArray)
      localStorage.setItem("albums", JSON.stringify(newArray));

      await axios.delete(`http://localhost:8000/album/${albumId}`)

      toast({
        title: "Album excluído",
        description: "O album foi excluído com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Erro ao excluir o album: ', err)


      const erro = err.response.data.error
      toast({
        title: "Erro ao excluir o album",
        description: erro,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const resetFilter = () => {
    setFilteredData(data); // Define os dados filtrados como os dados originais
  };


  return (
    <>
      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
        direction='column'
      >
        <Flex py={5}><h1>Bem vindo ao gerenciador da discocrafia da dupla Tião Carreiro e Pardinho!</h1></Flex>
        <Flex maxW={800} w="100%" h="30vh" py={2} px={10} justify='space-between' align="center">
          <Tooltip label='Adicionar novo album'>
            <Button colorScheme='blue' onClick={() => onAlbumModalOpen()}>Novo Album</Button>
          </Tooltip>
          <SearchBar searchData={searchData} resetFilter={resetFilter} />


        </Flex>
        <Flex overflowY="auto" width="100vh" height="100vh" >
          <Table mt='2' spacing='0' border="2px" borderColor="gray.200">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Album
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Artista
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody style={{ verticalAlign: "top" }}>
              {filteredData && Object.values(filteredData).map((album, index) => {
                return (
                  <Tr key={index} cursor="pointer" >
                    <Td maxW={isMobile ? 5 : 100}>{album.album_name}</Td>
                    <Td maxW={isMobile ? 5 : 100}>Tião Carreiro e Pardinho</Td>
                    <Td p={0}>
                      <Tooltip label='Ver músicas'>
                        <ViewIcon fontSize={20} onClick={() => [setSelectedAlbumId(album.id), onViewMusicsModalOpen()]}></ViewIcon>
                      </Tooltip>
                    </Td>
                    <Td p={0}>
                      <Tooltip label='Adicionar Música'>
                        <AddIcon fontSize={20} onClick={() => [setSelectedAlbumId(album.id), onMusicModalOpen()]} ></AddIcon>
                      </Tooltip>

                    </Td>
                    <Td p={0}>
                      <Tooltip label='Alterar album'>
                        <EditIcon fontSize={20} onClick={() => [setSelectedAlbumId(album.id), onEditAlbumModalOpen()]}></EditIcon>
                      </Tooltip>

                    </Td>
                    <Td p={0}>
                      <Tooltip label='Deletar album'>
                        <DeleteIcon fontSize={20} onClick={() => handleRemove(album.id)}></DeleteIcon>
                      </Tooltip>

                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        {isAlbumModalOpen && (
          <ModalNewAlbum
            isOpen={isAlbumModalOpen}
            onClose={onAlbumModalClose}
            data={data}
            setData={setData}
            fetchAlbums={fetchAlbums}
          />
        )}

        {isMusicModalOpen && (
          <ModalNewMusic
            isOpen={isMusicModalOpen}
            onClose={onMusicModalClose}
            selectedAlbumId={selectedAlbumId}
            data={data}
            setData={setData}
          />
        )}

        {isEditAlbumModalOpen && (
          <ModalEditAlbum
            isOpen={isEditAlbumModalOpen}
            onClose={onEditAlbumModalClose}
            selectedAlbumId={selectedAlbumId}
            data={data}
            setData={setData}
            fetchAlbums={fetchAlbums}
          />
        )}

        {isViewMusicsModalOpen && (
          <MusicModal
            isOpen={isViewMusicsModalOpen}
            onClose={onViewMusicsModalClose}
            selectedAlbumId={selectedAlbumId}
          />
        )}
      </Flex>
    </>
  )
}

export default App
