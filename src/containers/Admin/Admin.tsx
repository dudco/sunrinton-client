import * as React from 'react';

import * as styles from './Admin.less'

import axios, { AxiosResponse } from 'axios';

// export interface AdminProps {
// }

export interface User{
    name?: string;
    gender: string;
    phone?: string;
    sID?: string;
    team?: string;
    role?: string;
    type?: string;
    project?: string;
    portpolio?: string;
    size?: string;
}

export interface AdminState {
    passwd: string;
    check: boolean;
    users: User[];
}
export default class Admin extends React.Component<{}, AdminState> {
    constructor(props) {
        super(props);

        this.state = {
            passwd: "",
            check: false,
            users: [],
        }

        this.pwConfirm = this.pwConfirm.bind(this);
        this.onChangePW = this.onChangePW.bind(this);
    }

    public render() {
        if (this.state.check) {
            return (
                <div>
                    <User header={true}/>
                    {this.state.users.map((user, idx) => {
                        return <User key={idx} header={false} user={user}/>
                    })}
                </div>
            )
        } else {
            return (
                <div className={styles.idx}>
                    <input type="text" onChange={this.onChangePW} />
                    <button onClick={this.pwConfirm}>확인</button>
                </div>
            );
        }
    }

    private onChangePW(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ passwd: e.currentTarget.value });
    }
    private pwConfirm() {
        axios.post('/api/users', { passwd: this.state.passwd })
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    const users = res.data.map((user) => {
                        return {
                            name: user.name,
                            team: user.team.name,
                            phone: user.phone,
                            sID: user.sId,
                            role: user.role,
                            type: user.type,
                            portpolio: user.portpolio,
                            project: user.project,
                            size: user.size
                        }
                    })
                    console.log(users, res.data);
                    this.setState({ check: true, users })
                }
                else {
                    console.log(res.data.message);
                    alert("땡!")
                }
            })
    }
}

interface UserProps {
    user?: User;
    header: boolean;
}


const User: React.SFC<UserProps> = (props) => (
    <div className={styles.user}>
        <span>{props.header ? "팀명" : props.user.team}</span>
        <span>{props.header ? "이름" : props.user.name}</span>
        <span>{props.header ? "남/여" : props.user.gender}</span>
        <span>{props.header ? "연락처" : props.user.phone}</span>
        <span>{props.header ? "학번" : props.user.sID}</span>
        <span>{props.header ? "직군" : props.user.role}</span>
        <span>{props.header ? "분야" : props.user.type}</span>
        <span>{props.header ? "포트폴리오" : props.user.portpolio}</span>
        <span>{props.header ? "프로젝트" : props.user.project}</span>
        <span>{props.header ? "사이즈" : props.user.size}</span>
    </div>
)