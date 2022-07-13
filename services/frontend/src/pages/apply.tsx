import { Header } from '../components/Header';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Container,
  Text,
} from '@chakra-ui/react';
import React from 'react';

function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

function ErrorMessageExample() {
  const [input, setInput] = React.useState(null)
  const [input2, setInput2] = React.useState(null)
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const handleClick = () => setShow(!show)
  const handleClick2 = () => setShow2(!show2)
  const handleInputChange = (e) => setInput(e.target.value)
  const handleInputChange2 = (e) => setInput2(e.target.value)

  const isError = input === ''
  const isError2 = input2 === ''

  return (
    <div>
      <FormControl isInvalid={isError}>
        <FormLabel m='12px'>パスワード</FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            value={input}
            onChange={handleInputChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        { !isError ? (
          <span></span>
        ) : (
          <FormErrorMessage>必須項目です</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={isError2}>
        <FormLabel m='12px'>パスワード（確認用）</FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show2 ? 'text' : 'password'}
            value={input2}
            onChange={handleInputChange2}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick2}>
              {show2 ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        { !isError2 ? (
          input2 !== input ? (
            <FormErrorMessage>パスワードが一致しません</FormErrorMessage>
          ) : (
            <span></span>
          )
        ) : (
          <FormErrorMessage>必須項目です</FormErrorMessage>
        )}
      </FormControl>
    </div>
  );
};

const Page = () => {
  return (
    <div id='app'>
      <div class='header'>
        <Header />
      </div>
      <Text fontSize={32} m='20px'>体験入会申請フォーム</Text>
      <Container>
        <Box borderWidth='2px' borderRadius='20px' overflow='hidden' mt='12px' p='12px'>
          <Container>
            <div class='form'>
              <FormControl>
                <div>
                  <FormLabel htmlFor='name' m='12px'>お名前</FormLabel>
                  <Input id='name' type='name' />
                </div>
                <div>
                  <FormLabel htmlFor='email' m='12px'>メールアドレス</FormLabel>
                  <Input id='email' type='email' />
                </div>
                <div>
                  <FormLabel m='12px'>学校・学部・学科名・学年</FormLabel>
                  <Input/>
                </div>
                {/* <div>
                  <FormLabel m='12px'>パスワード</FormLabel>
                  <PasswordInput/>
                </div>
                <div>
                  <FormLabel m='12px'>パスワード（確認用）</FormLabel>
                  <PasswordInput/>
                </div> */}
                <div>
                  <ErrorMessageExample/>
                </div>
              </FormControl>
            </div>
          </Container>
        </Box>
      </Container>
    </div>
  );
};

export default Page;