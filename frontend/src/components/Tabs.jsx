import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Link
} from '@chakra-ui/react'
import Login from './Login.jsx';
import SignUp from './SignUp.jsx'
const tabs = () => {
    return (
        <Tabs variant='soft-rounded'>
            <TabList mb='0.5em'>
                <Tab w='50%' _selected={{ color: 'black', bg: 'teal.100' }}>Login</Tab>
                <Tab w='50%' _selected={{ color: 'black', bg: 'teal.100' }}>SignUp</Tab>
            </TabList>
            <TabPanels>
                <TabPanel _selected={{ color: 'black', bg: 'teal.300' }}>
                   <Login/>
                </TabPanel>
                <TabPanel>
                    <SignUp/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default tabs;