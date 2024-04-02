import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Tooltip,
    useDisclosure
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect, } from "react";
import { MusicSearchBar } from "./SearchMusicBar";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { URL } from "../constants/url";

export const MusicModal = ({ isOpen, onClose, selectedAlbumId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [album, setAlbum] = useState(null);
    const [selectedMusicId, setSelectedMusicId] = useState(null)
    const [newMusicName, setNewMusicName] = useState("")
    const [filteredMusics, setFilteredMusics] = useState([]);
    const { isOpen: isEditMusicModalOpen, onOpen: onEditMusicModalOpen, onClose: onEditMusicModalClose } = useDisclosure();
    const toast = useToast();

    const fetchAlbum = async () => {
        try {
            const response = await axios.get(`${URL}/album/${selectedAlbumId}`);
            setAlbum(response.data);
            setFilteredMusics(response.data.musics);
        } catch (err) {
            console.error('Erro em buscar album:', err);
            const erro = err.response.data.error
            toast({
                title: "Erro ao buscar album",
                description: erro,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (selectedAlbumId) {
            fetchAlbum();
        }
    }, [selectedAlbumId]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (!term) {
            setFilteredMusics(album.musics);
            return;
        }
        const filtered = album.musics.filter((music) =>
            music.music_name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredMusics(filtered);
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilteredMusics(album.musics);
    };

    const handleDelete = async (musicId) => {
        try {
            const newArray = filteredMusics.filter((music) => music.id !== musicId)
            setFilteredMusics(newArray)

            await axios.delete(`${URL}/album/${selectedAlbumId}/music/${musicId}`)

            const updatedAlbum = { ...album };
            updatedAlbum.musics = updatedAlbum.musics.filter((music) => music.id !== musicId);
            setAlbum(updatedAlbum);

            toast({
                title: "Música excluída",
                description: "A música foi excluída com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        } catch (err) {
            console.error('Erro ao excluir a música', err)

            const erro = err.response.data.error
            toast({
                title: "Erro ao excluir a música",
                description: erro,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`${URL}/album/${selectedAlbumId}/music/${selectedMusicId}`, { music_name: newMusicName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            fetchAlbum()
            onEditMusicModalClose()

            toast({
                title: "Música editada",
                description: "A música foi editada com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Erro ao fazer a edição: ', err)
            const erro = err.response.data.error
            toast({
                title: "Erro ao editar música",
                description: erro,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{album ? album.album_name : ''}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MusicSearchBar searchData={handleSearch} resetFilter={handleReset}/>
                        <Table mt="4">
                            <Thead>
                                <Tr>
                                    <Th>Título da Música</Th>
                                    <Th>Ações</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredMusics.map((music) => (
                                    <Tr key={music.id}>
                                        <Td>{music.music_name}</Td>
                                        <Td>
                                            <Tooltip label="Editar música">
                                                <IconButton icon={<EditIcon />} mr={2} onClick={() => [setSelectedMusicId(music.id), onEditMusicModalOpen()]} />
                                            </Tooltip>
                                            <Tooltip label="Deletar música" >
                                                <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(music.id)} />
                                            </Tooltip>

                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isEditMusicModalOpen} onClose={onEditMusicModalClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Editar música</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl display='flex' flexDir='column' gap={4}>
                                <Box>
                                    <FormLabel>Nome da música</FormLabel>
                                    <Input type="text" value={newMusicName} onChange={(e) => setNewMusicName(e.target.value)} />
                                </Box>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter justifyContent='start'>
                            <Button colorScheme="green" mr={3} onClick={handleSaveEdit}>SALVAR</Button>
                            <Button colorScheme="red" onClick={onEditMusicModalClose}>CANCELAR</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
};
