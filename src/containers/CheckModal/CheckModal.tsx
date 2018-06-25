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
                        this.state.team === "" ?
                            <input type="text" onChange={this.onChangeSID} placeholder={"팀명을 입력하세요."} maxLength={10} /> :
                            this.state.team  === "none" ? <span>"{this.state.sID}"팀을 찾을 수 없습니다.</span> : 
                            this.state.isPass ? <span>"{this.state.team}"팀은 통과하셨습니다!!</span> : <span>"{this.state.team}"팀은 <br/> 아쉽게도 저희와 함께하실 수 없습니다 ㅠㅠ</span>
                    }

                    {
                        this.state.team === "" ?
                            <div>
                                <button onClick={this.onClickConfirm}>확인</button>
                                <button onClick={this.onClickCancel}>취소</button>
                            </div> :
                            <div>
                                <button onClick={this.onClickCancel}>확인</button>
                            </div>
                    }
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
