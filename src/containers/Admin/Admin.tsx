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
    isCheck?: boolean;
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
    order: string;
}

const roleOrder: string[] = ["팀장", "개발", "디자인"];
const sizeOrder: string[] = ["M", "L", "XL", "2XL"];
export default class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props) {
        super(props);

        this.state = {
            passwd: "",
            check: false,
            items: [],
            params: null,
            order: "teamI" // teamI 팀으로 오름차순 teamD 팀으로 내림차순
        }

        this.pwConfirm = this.pwConfirm.bind(this);
        this.onChangePW = this.onChangePW.bind(this);

        this.onOrderSize = this.onOrderSize.bind(this);
        this.onOrderTeam = this.onOrderTeam.bind(this);
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
                        <User header={true}  onOrderSize={this.onOrderSize} onOrderTeam={this.onOrderTeam} />
                        {this.state.items.map((user: User, idx) => {
                            return <User idx={idx} key={idx} header={false} user={user} onClickPass={this.onClickUserPass}/>
                        })}
                    </div>
                )
            } else {
                return (
                    <div className={styles.idx}>
                        <Team header={true} />
                        {this.state.items.map((team: Team, idx) => {
                            return <Team idx={idx} key={idx} header={false} team={team} onClickDownLoad={this.onClickTeamDownLoad} />
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
                            gender: user.gender,
                            isCheck: user.isCheck
                        }
                    });
                    items = items.sort((a: User, b: User) => {
                        if (a.isCheck) {
                            return 1;
                        } else if (b.isCheck) {
                            return -1;
                        } else if (a.team < b.team) {
                            return -1;
                        } else if (a.team > b.team) {
                            return 1;
                        } else {
                            return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
                        }
                    });
                    console.log("생활 - 팀장", this.getSizes(items, "팀장", "생활"))
                    console.log("생활 - 개발", this.getSizes(items, "개발", "생활"))
                    console.log("생활 - 디자인", this.getSizes(items, "디자인", "생활"))
                    console.log("\n");
                    console.log("게임 - 팀장", this.getSizes(items, "팀장", "게임"))
                    console.log("게임 - 개발", this.getSizes(items, "개발", "게임"))
                    console.log("게임 - 디자인", this.getSizes(items, "디자인", "게임"))


                    this.setState({ check: true, items })
                }
                else {
                    console.log(res.data.message);
                    alert("땡!")
                }
            })
    }
    private getTeams() {
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

    private onClickTeamDownLoad(name: string) {
        axios.get(`/api/team/${name}`).then((res: AxiosResponse) => {
            window.open(res.data, '_blank');
            window.focus();
        })
    }

    private onClickUserPass(name) {
        console.log(name);
        axios.post(`/api/check/${name}`).then((res: AxiosResponse) => {
            if (res.status === 200 && res.data.message === "okay") {
                location.reload();
            }
        });
    }

    private onOrderSize() {
        let newItems;
        if(this.state.order === "sizeI") {
            newItems = this.state.items.sort((a: User, b: User) => {
                return sizeOrder.indexOf(b.size) - sizeOrder.indexOf(a.size);
            });
        } else {
            newItems = this.state.items.sort((a: User, b: User) => {
                return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
            });
        }
        this.setState({items: newItems, order: this.state.order === "sizeI" ? "sizeD" : "sizeI"});
    }

    private onOrderTeam() {
        let newItems;
        if(this.state.order === "teamI") {
            newItems = this.state.items.sort((a: User, b: User) => {
                if (a.isCheck) {
                    return 1;
                } else if (b.isCheck) {
                    return -1;
                } else if (a.team > b.team) {
                    return -1;
                } else if (a.team < b.team) {
                    return 1;
                } else {
                    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
                }
            });
        } else {
            newItems = this.state.items.sort((a: User, b: User) => {
                if (a.isCheck) {
                    return 1;
                } else if (b.isCheck) {
                    return -1;
                } else if (a.team < b.team) {
                    return -1;
                } else if (a.team > b.team) {
                    return 1;
                } else {
                    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
                }
            });
        }
        this.setState({items: newItems, order: this.state.order === "teamI" ? "teamD" : "teamI"});
    }

    private getSizes(items, role, type) {
        const chItems = items.filter((i) => i.role === role);

        const S = chItems.filter((i) => i.size === "S" && i.type === type).length;
        const M = chItems.filter((i) => i.size === "M" && i.type === type).length;
        const L = chItems.filter((i) => i.size === "L" && i.type === type).length;
        const XL = chItems.filter((i) => i.size === "XL" && i.type === type).length;
        const XL2 = chItems.filter((i) => i.size === "2XL" && i.type === type).length;
        
        return {S, M, L, XL, XL2};
    }
}

interface UserProps {
    user?: User;
    header: boolean;
    idx?: number;
    onClickPass?(name);
    onOrderSize?();
    onOrderTeam?();
}


const User: React.SFC<UserProps> = (props) => (
    <div className={styles.user} style={{ background: props.user && props.user.isCheck ? "yellow" : "white" }}>
        <span>{props.header ? "" : props.idx + 1}</span>
        {props.header ?
            <span onClick={() => { props.onOrderTeam()}}>{props.header ? "팀명" : props.user.team}</span> :
            <span >{props.header ? "팀명" : props.user.team}</span>
        }
        <span>{props.header ? "이름" : props.user.name}</span>
        <span>{props.header ? "성별" : props.user.gender}</span>
        <span>{props.header ? "연락처" : props.user.phone}</span>
        <span>{props.header ? "학번" : props.user.sID}</span>
        <span>{props.header ? "직군" : props.user.role}</span>
        <span>{props.header ? "분야" : props.user.type}</span>
        <span>{props.header ? "포트폴리오" : <Link to={props.user.portpolio} target="_black">다운로드</Link>}</span>

        {props.header ?
            <span onClick={() => { props.onOrderSize()}}>{props.header ? "사이즈" : props.user.size}</span> :
            <span >{props.header ? "사이즈" : props.user.size}</span>
        }
        <span>{props.header ? "프로젝트" : <pre>{props.user.project}</pre>}</span>
        <button onClick={() => { props.onClickPass(props.user.name) }}>입장!</button>
    </div>
)
interface TeamProps {
    team?: Team;
    header: boolean;
    idx?: number;
    onClickDownLoad?(name: string);
}

const Team: React.SFC<TeamProps> = (props) => (
    <div className={styles.team}>
        <span>{props.header ? "" : props.idx + 1}</span>
        <span>{props.header ? "팀명" : props.team.name}</span>
        <span>{props.header ? "분야" : props.team.users[0].type}</span>
        <span>{props.header ? "팀원" : <span>{props.team.users.map((user, idx) => (props.team.users.length !== idx + 1 ? user.name + ", " : user.name))}</span>}</span>
        {/* <span>{props.header ? "연락처" : props.user.phone}</span> */}
        {/* <span>{props.header ? "학번" : props.user.sID}</span> */}
        {/* <span>{props.header ? "직군" : props.user.role}</span> */}
        {/* <span>{props.header ? "분야" : props.user.type}</span> */}
        <span>{props.header ? "포트폴리오" : <button onClick={() => { props.onClickDownLoad(props.team.name) }}>다운로드</button>}</span>
        {/* <span>{props.header ? "사이즈" : props.user.size}</span> */}
        {/* <span>{props.header ? "프로젝트" : <pre>{props.user.project}</pre>}</span> */}
        <button>수정</button>
        <button>삭제</button>
    </div>
)
