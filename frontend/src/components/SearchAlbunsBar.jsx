import React from "react";
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon, Flex, Tooltip } from "@chakra-ui/react";
import { Search2Icon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const SearchBar = ({ searchData, resetFilter }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {

    searchData(searchValue)
  }


  const handleReset = () => {
    setSearchValue('');
    resetFilter();
  };
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Tooltip label='Voltar'>
          <ArrowBackIcon onClick={handleReset} size="sm"></ArrowBackIcon>
        </Tooltip>
        <InputGroup borderRadius={5} size="sm" width="350px">
          <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.600" />} />
          <Input type="text" placeholder="Pesquise por albuns" border="1px solid #949494" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <InputRightAddon p={0} border="none">
            <Button onClick={handleSearch} size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
              Pesquisar
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Flex>
    </>
  );
};
