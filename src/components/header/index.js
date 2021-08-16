import { useEffect, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Drawer from "@material-ui/core/Drawer"
import { ErrorBoundary } from "react-error-boundary"
import { logger } from "../error"
import "./style.css"

export default function Header() {
    const { push } = useHistory()
    const [visible, setVisible] = useState(true)

    useScrollPosition(
        ({ prevPos, currPos }) => {
            const isVisible = currPos.y > prevPos.y || currPos.y > -100
            if (isVisible !== visible) {
                setVisible(isVisible)
            }
        },
        [visible]
    )

    const isMobile = useIsMobile()

    return (
        <div className={`header ${visible ? "isVisible" : "isNotVisible"}`} >
            <div className="headerLogoContainer" onClick={() => push("/")}>
                <img className="headerLogo" alt="BlockM" src={`${process.env.PUBLIC_URL}/icons/blockM.svg`} />
                <div className="headerLine" />
                <div className="headerText" >
                    <div className="headerTitle">MEN'S WATER POLO</div>
                    <div className="headerSubtitle">14 TIME BIG TEN CHAMPIONS</div>
                </div>
            </div>
            <ErrorBoundary fallback={<div>Error</div>} onError={logger}>
                {
                    isMobile ? <MobileNav /> : <Nav />
                }
            </ErrorBoundary>
        </div>
    )
}

function useIsMobile() {
    const [size, setSize] = useState(true);
    useEffect(() => {
        function updateSize() {
            setSize(window.innerWidth < 950);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="headerHamburger" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    className: "mobileNav",
                }}
            >
                <div onClick={() => setIsOpen(false)} className="mobileHeaderClose">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                    </svg>
                </div>
                {
                    ["Schedule", "Roster", "Fundraising", "News", "About", "Contact"].map((item, index) => {
                        const path = `/${item.toLowerCase()}`
                        return (
                            <NavLink key={index} to={path} onClick={() => setIsOpen(false)} className="mobileNavItem" activeClassName="active">{item}</NavLink>
                        )
                    })
                }
            </Drawer>
        </>
    )
}

const Nav = () => {
    return (
        <div className="nav">
            {
                ["Schedule", "Roster", "Fundraising", "News", "About", "Contact"].map((item, index) => {
                    const path = `/${item.toLowerCase()}`
                    return (
                        <NavLink key={index} to={path} className="navItem" activeClassName="active">{item}</NavLink>
                    )
                })
            }
        </div>
    )
}
