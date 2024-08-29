import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faPlus,
    faMessage,
    faCommenting,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import images from '~/assets/images';
import styles from './Header.module.scss';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import {
    CoinIcon,
    CreatorToolIcon,
    DarkModeIcon,
    HelpIcon,
    InboxIcon,
    LanguageIcon,
    LiveCreatorHubIcon,
    LiveStudioIcon,
    LogoutIcon,
    MessageIcon,
    ProfileIcon,
    SearchIcon,
    SettingsIcon,
    ShortcutsIcon,
    UploadIcon,
    ViewAnalyticsIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <CreatorToolIcon />,
        title: 'Creator tools',
        children: {
            title: 'Creator tools',
            data: [
                {
                    type: 'creator tools',
                    title: 'View Analytics',
                    icon: <ViewAnalyticsIcon />,
                    separate: true,
                },
                {
                    type: 'creator tools',
                    title: 'LIVE Studio',
                    icon: <LiveStudioIcon />,
                },
                {
                    type: 'creator tools',
                    title: 'LIVE Creator Hub',
                    icon: <LiveCreatorHubIcon />,
                },
            ],
        },
    },
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <HelpIcon />,
        title: 'Feedback and help',
        to: './feedback',
    },
    {
        icon: <DarkModeIcon />,
        title: 'Dark mode',
    },
];

function Header() {
    const [searchResult, setSeachResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSeachResult([]);
        }, 0);
    }, []);

    //Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle language change
                break;
            case 'feedback':
                // Handle feedback
                break;
            default:
                // Handle other menu items
                break;
        }
    };

    const userMenu = [
        {
            icon: <ProfileIcon />,
            title: 'View profile',
            to: './anguyen',
        },
        {
            icon: <CoinIcon />,
            title: 'Get coins ',
            to: './coin',
        },
        MENU_ITEMS[0],
        {
            icon: <SettingsIcon />,
            title: 'Settings',
            to: './settings',
        },
        ...MENU_ITEMS.slice(1, 4),
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            to: './logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </div>
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <WrapperPopper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </WrapperPopper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button basic leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <div>
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                    </button>
                                    <sup className={cx('num-infor')}>30</sup>
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                            {/* <Button text>Upload</Button> */}
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://primaart.vn/wp-content/uploads/2024/03/100-hinh-chibi-cute-de-ve-cach-ve-chi-tiet-1234.jpg"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
