import * as React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';

import * as styles from './Admin.less'

import axios, { AxiosResponse } from 'axios';

export interface AdminProps extends RouteComponentProps<{ type: string }> {
}

export interface User {
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

export interface Team {
    name?: string;
    users?: User[];
}

export interface AdminState {
    passwd: string;
    check: boolean;
    items: User[] & Team[];
    params;
}

const roleOrder: string[] = ["팀장", "개발", "디자인"];
export default class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props) {
        super(props);

        this.state = {
            passwd: "",
            check: false,
            items: [],
            params: null
        }

        this.pwConfirm = this.pwConfirm.bind(this);
        this.onChangePW = this.onChangePW.bind(this);
    }

    public componentDidMount() {
        if (this.state.check) {
            this.getUserOrTeam();
        }

        axios.post('/api/isAdmin').then((res) => {
            this.setState({ check: (res.data ? res.data : false) });
            if (res.data) {
                this.getUserOrTeam();
            }
        });
    }

    public render() {
        const params = new URLSearchParams(this.props.location.search)
        if (params.get('type') === null) {
            return <Redirect to="/admin?type=users" />
        }
        if (this.state.check) {
            if (params.get('type') === "users") {
                return (
                    <div className={styles.idx}>
                        <User header={true} />
                        {this.state.items.map((user: User, idx) => {
                            return <User idx={idx} key={idx} header={false} user={user} />
                        })}
                    </div>
                )
            } else {
                return (
                    <div className={styles.idx}>
                        <Team header={true} />
                        {this.state.items.map((team, idx) => {
                            return <Team idx={idx} key={idx} header={false} team={team} />
                        })}
                    </div>
                )
            }
        } else {
            return (
                <div>
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
        const params = new URLSearchParams(this.props.location.search)
        if (params.get('type') === "teams") {
            this.getTeams();
        } else {
            this.getUsers()
        }
    }

    private getUserOrTeam() {
        const params = new URLSearchParams(this.props.location.search)
        if (params.get('type') === "teams") {
            this.getTeams();
        } else {
            this.getUsers()
        }
    }

    private getUsers() {
        console.log("getUser!!");
        axios.post('/api/users', { passwd: this.state.passwd })
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    let items = res.data.map((user) => {
                        return {
                            name: user.name,
                            team: user.team.name,
                            phone: user.phone,
                            sID: user.sId,
                            role: user.role,
                            type: user.type,
                            portpolio: user.portpolio,
                            project: user.project,
                            size: user.size,
                            gender: user.gender
                        }
                    });
                    items = items.sort((a: User, b: User) => {
                        if (a.team < b.team) {
                            return -1;
                        } else if (a.team > b.team) {
                            return 1;
                        } else {
                            return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
                        }
                    });
                    this.setState({ check: true, items })
                }
                else {
                    console.log(res.data.message);
                    alert("땡!")
                }
            })
    }
    private getTeams() {
        console.log("getTeams!!");
        axios.post('/api/teams', { passwd: this.state.passwd })
            .then((res: AxiosResponse) => {
                let items = res.data.map((team) => {
                return {
                        name: team.name,
                        users: team.users,
                    }
                });
                items = items.sort((a: User, b: User) => {
                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                this.setState({ items, check: true });
            })
    }
}

interface UserProps {
    user?: User;
    header: boolean;
    idx?: number;
}


const User: React.SFC<UserProps> = (props) => (
    <div className={styles.user}>
        <span>{props.header ? "" : props.idx + 1}</span>
        <span>{props.header ? "팀명" : props.user.team}</span>
        <span>{props.header ? "이름" : props.user.name}</span>
        <span>{props.header ? "성별" : props.user.gender}</span>
        <span>{props.header ? "연락처" : props.user.phone}</span>
        <span>{props.header ? "학번" : props.user.sID}</span>
        <span>{props.header ? "직군" : props.user.role}</span>
        <span>{props.header ? "분야" : props.user.type}</span>
        <span>{props.header ? "포트폴리오" : <Link to={props.user.portpolio} target="_black">다운로드</Link>}</span>
        <span>{props.header ? "사이즈" : props.user.size}</span>
        <span>{props.header ? "프로젝트" : <pre>{props.user.project}</pre>}</span>
        <button>수정</button>
        <button>삭제</button>
    </div>
)
interface TeamProps {
    team?: Team;
    header: boolean;
    idx?: number;
}

const Team: React.SFC<TeamProps> = (props) => (
    <div className={styles.team}>
        <span>{props.header ? "" : props.idx + 1}</span>
        <span>{props.header ? "팀명" : props.team.name}</span>
        <span>{props.header ? "분야" : props.team.users[0].type}</span>
        <span>{props.header ? "팀원" : <span>{props.team.users.map((user, idx) => (props.team.users.length !== idx+1 ? user.name + ", " : user.name))}</span>}</span>
        {/* <span>{props.header ? "연락처" : props.user.phone}</span> */}
        {/* <span>{props.header ? "학번" : props.user.sID}</span> */}
        {/* <span>{props.header ? "직군" : props.user.role}</span> */}
        {/* <span>{props.header ? "분야" : props.user.type}</span> */}
        <span>{props.header ? "포트폴리오" : <span>다운로드</span>}</span>
        {/* <span>{props.header ? "사이즈" : props.user.size}</span> */}
        {/* <span>{props.header ? "프로젝트" : <pre>{props.user.project}</pre>}</span> */}
        <button>수정</button>
        <button>삭제</button>
    </div>
)
