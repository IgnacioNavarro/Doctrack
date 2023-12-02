import Navigation from './Navigation';
import {HomeSectionL, HomeSectionR} from './HomeSection';
import Footer from './Footer';
import logo400dark from '../static/images/logo400dark.png';
import multichain from '../static/images/multichain.webp';

const Landing = () => {
                //Button to register as a user under the first section

                //button to register as an enterprise under the second section

                //whitepaper redirecting to thesis

                //contact redirecting to footer

                //about redirecting to third section what docTrack is
    return (
        <div>
            <Navigation />
            <HomeSectionL title="Welcome to DocTrack"
            description="
            The objective of this study consists of the development of a dApp
             that allows users to deliver and trace documents through a smart contract and blockchain technology,
             thus offering shorter waiting times and monitoring the status of the document in a simple way." 
            src={logo400dark}
            id="About"/>      
            <HomeSectionR title={"Blockchain Technology"}
             description="A blockchain is a distributed database or ledger that is shared among the nodes of a computer network.
              As a database, a blockchain stores information electronically in digital format. Blockchains are best known for their crucial role in cryptocurrency systems, such as Bitcoin,
             for maintaining a secure and decentralized record of transactions. 
             The innovation with a blockchain is that it guarantees the fidelity and security of a record of data and generates trust without the need for a trusted third party."
                src={multichain} 
            />
            <Footer/>
        </div>
        

        
    )
}

export default Landing;