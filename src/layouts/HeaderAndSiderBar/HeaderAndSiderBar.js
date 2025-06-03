import classNames from 'classnames/bind';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from '../DefaultLayout/DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function HeaderAndSiderBar({children})
{
    return(
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default HeaderAndSiderBar