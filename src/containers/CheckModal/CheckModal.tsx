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
    onClickConfirm: (sID: string) => void;
    onClickCancel: () => void;
    animationEnd: () => void;
}
export interface CheckModalState {
    sID: string;
    loading: boolean;
    name: string;
    team: string;
}

export default class CheckModal extends React.Component<CheckModalProps, CheckModalState> {
    private container: HTMLDivElement;
    constructor(props) {
        super(props);

        this.state = {
            sID: "",
            loading: true,
            name: "",
            team: ""
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
                        this.state.name === "" || this.state.team === "" ?
                            <input type="text" onChange={this.onChangeSID} placeholder={"학번을 입력하세요."} maxLength={5} /> :
                            this.state.name === "err" && this.state.team === "err" ?
                                <span>"{this.state.sID}"번호로 신청된 정보를 찾지 못했습니다.</span> :
                                <span>"{this.state.name}"님은 "{this.state.team}"팀으로 신청됐습니다.</span>
                    }

                    {
                        this.state.name === "" || this.state.team === "" ?
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
        this.props.onClickConfirm(this.state.sID);

        this.setState({ loading: true });
        axios.get(`/api/user/${this.state.sID}`)
            .then((res: AxiosResponse) => {
                this.setState({ loading: false });
                if (res.status === 200) {
                    this.setState({ name: res.data.name, team: res.data.team });
                } else {
                    this.setState({ name: "err", team: "err" });
                }
            })
    }

    private onClickCancel() {
        this.props.onClickCancel();
    }
}
