import axios, { AxiosResponse } from 'axios';
import * as React from 'react';

import * as classNames from 'classnames/bind';
import * as styles from './CheckModal.less';
const cx = classNames.bind(styles);

import { MoonLoader } from 'react-spinners';

const Loading: React.SFC<{}> = props => (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
        <MoonLoader
            color={'#642c8f'}
        />
    </div>
);

export interface CheckModalProps {
    show: string;
    onClickConfirm?: (sID: string) => void;
    onClickCancel: () => void;
    animationEnd: () => void;
}
export interface CheckModalState {
    sID: string;
    loading: boolean;
    name: string;
    team: string;
    isPass: boolean;
    isHover: string;
}

export default class CheckModal extends React.Component<CheckModalProps, CheckModalState> {
    private container: HTMLDivElement;
    constructor(props) {
        super(props);

        this.state = {
            sID: "",
            loading: true,
            name: "",
            team: "",
            isPass: false,
            isHover: "none"            
        }

        this.onChangeSID = this.onChangeSID.bind(this);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.animationEnd = this.animationEnd.bind(this);

        document.addEventListener("animationend", this.animationEnd);
    }

    public componentDidMount() {
        this.setState({ loading: false });
    }


    public render() {
        return (
            <div className={cx(styles.idx, { show: this.props.show === "show", none: this.props.show === "disable" })}>
                <div ref={elem => this.container = elem}>
                    {this.state.loading && <Loading />}
                    {
                        this.props.show !== "disabled" ? 
                        <div>
                            <span className={cx({isHover:this.state.isHover === "item1"})} onMouseOver={() => {this.setState({isHover: "item1"})}} onMouseOut={() => {this.setState({isHover: "none"})}}>기상이변</span>
                            <span className={cx({isHover:this.state.isHover === "item2"})} onMouseOver={() => {this.setState({isHover: "item2"})}} onMouseOut={() => {this.setState({isHover: "none"})}}>생존</span>
                            <span className={cx({isHover:this.state.isHover === "item3"})} onMouseOver={() => {this.setState({isHover: "item3"})}} onMouseOut={() => {this.setState({isHover: "none"})}}>도시문제</span>
                        </div> : 
                        <div>
                            개발자도구 꺼라 ㅋ
                        </div>
                    }
                    <div>
                        <button onClick={this.onClickCancel}>확인</button>
                    </div>
                </div>
            </div>
        );
    }

    private onChangeSID(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ sID: e.currentTarget.value });
    }

    private animationEnd() {
        if (this.props.show === "disable") {
            this.setState({ name: "", team: "", sID: "" })
            this.props.animationEnd()
        }
    }

    private onClickConfirm() {
        // this.props.onClickConfirm(this.state.sID);

        if(this.state.sID !== "") {
            this.setState({ loading: true });
            axios.get(`/api/pass/${this.state.sID}`)
                .then((res: AxiosResponse) => {
                    console.log(res.data);
                    this.setState({ loading: false });
                    if(res.data.team === "none") {
                        this.setState({team: "none", isPass: false})
                    } else if (!res.data.isPass && res.data.team !== "none") {
                        this.setState({team: res.data.team, isPass: false});
                    } else {
                        this.setState({team: res.data.team, isPass: true});
                    }
                })
        }
    }

    private onClickCancel() {
        this.props.onClickCancel();
    }
}
