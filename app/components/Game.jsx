import React from 'react';
import UserCard from "./userCard.jsx";

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: props.count,
            type: props.type,
            cards: JSON.parse(JSON.stringify(startCards)),
            catastrophes: JSON.parse(JSON.stringify(catastrophes)),
            activeCatastrophe: undefined,
            userCards: [],
            openCards: true
        };

        this.randomGeneration = this.randomGeneration.bind(this);
        this.catastropheGeneration = this.catastropheGeneration.bind(this);
        this.handleChangeOpen = this.handleChangeOpen.bind(this);
        this.editUserCard = this.editUserCard.bind(this);
        this.editUserCards = this.editUserCards.bind(this);
        this.setFileInfo = this.setFileInfo.bind(this);
        this.setFileCat = this.setFileCat.bind(this);
        this.exchangeInfo = this.exchangeInfo.bind(this);

        this.catastropheGeneration();
        this.state.type === 'Рандом' ? this.randomGeneration(this.props.count) : undefined;
    }

    async exchangeInfo(e, value, user1, user2) {
        let userCards = await JSON.parse(JSON.stringify(this.state.userCards));
        switch(value) {
            case 'Биологические данные':
                let temp = userCards[user1].gender;
                userCards[user1].gender = userCards[user2].gender;
                userCards[user2].gender = temp;
                temp = userCards[user1].childfree;
                userCards[user1].childfree = userCards[user2].childfree;
                userCards[user2].childfree = temp;
                break;
            case 'Профессия':
                temp = userCards[user1].profession;
                userCards[user1].profession = userCards[user2].profession;
                userCards[user2].profession = temp;
                break;
            case 'Фобия':
                temp = userCards[user1].phobia;
                userCards[user1].phobia = userCards[user2].phobia;
                userCards[user2].phobia = temp;
                break;
            case 'Состояние здоровья':
                temp = userCards[user1].health;
                userCards[user1].health = userCards[user2].health;
                userCards[user2].health = temp;
                break;
            case 'Хобби':
                temp = userCards[user1].hobby;
                userCards[user1].hobby = userCards[user2].hobby;
                userCards[user2].hobby = temp;
                break;
            case 'Багаж':
                userCards = await JSON.parse(JSON.stringify(this.state.userCards));
                temp = userCards[user1].baggage;
                userCards[user1].baggage = userCards[user2].baggage;
                userCards[user2].baggage = temp;
                break;
        }

        await this.setState({
            userCards: userCards
        });

        let type = 'data:text/plain;charset=utf-8,%EF%BB%BF';

        let text = this.setFileInfo(userCards[user1]);
        let base = await encodeURIComponent(text);
        let result = type + base;
        document.getElementById(`Игрок${user1+1}`).href = result;
        document.getElementById(`Игрок${user1+1}`).style.color = 'green';

        text = this.setFileInfo(userCards[user2]);
        base = await encodeURIComponent(text);
        result = type + base;
        document.getElementById(`Игрок${user2+1}`).href = result;
        document.getElementById(`Игрок${user2+1}`).style.color = 'green';

        alert('Файлы перезаписаны');
    }

    setFileCat(activeCatastrophe) {
        return `${activeCatastrophe.description}
Площадь бункера: ${activeCatastrophe.area}
Продолжительность пребывания в бункере: ${activeCatastrophe.duration}
Дополнительная комплектация: ${activeCatastrophe.stock}
Количество выжившего населения при выходе из бункера: ${activeCatastrophe.survivors}`;
    }

    setFileInfo(userCard) {
        return `Пол, возраст: ${userCard.gender.value} ${userCard.childfree === true ? ', Чайлдфри' : ''} 
Профессия: ${userCard.profession.value}
Состояние здоровья: ${userCard.health.value} 
Фобия: ${userCard.phobia.value} 
Хобби: ${userCard.hobby.value} 
Черта зарактера: ${userCard.character.value} 
Доп. информация: ${userCard.info.value} 
Багаж: ${userCard.baggage.value} 
Карта действий №1: ${userCard.action1.value} 
Карта действий №2: ${userCard.action2.value}
${userCard.card1 === true ?
            '\nСправа от вас друг. Если он не попадает в бункер, вы проигрываете.' : ''}
${userCard.card2 === true ?
            '\nСлева от вас друг. Если он не попадает в бункер, вы проигрываете.' : ''}
${userCard.card3 === true && userCard.card1 !== true ?
            '\nСправа от вас враг. Если он попадает в бункер вместе с вами, вы проигрываете.' : ''}
${userCard.card4 === true  && userCard.card2 !== true ?
            '\nСлева от вас враг. Если он попадает в бункер вместе с вами, вы проигрываете.' : ''}`;
    }

    async editUserCard(e, index, value) {
        switch(value) {
            case 'Биологические данные':
                if (this.state.cards.gender.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iGender = Math.round(Math.random() * (cards.gender.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].gender = cards.gender[iGender];
                    await cards.gender.splice(iGender, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Профессия':
                if (this.state.cards.professions.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iProfession = Math.round(Math.random() * (cards.professions.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].profession = cards.professions[iProfession];
                    await cards.professions.splice(iProfession, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Фобия':
                if (this.state.cards.phobias.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iPhobia = Math.round(Math.random() * (cards.phobias.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].phobia = cards.phobias[iPhobia];
                    await cards.phobias.splice(iPhobia, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Состояние здоровья':
                if (this.state.cards.health.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iHealth = Math.round(Math.random() * (cards.health.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].health = cards.health[iHealth];
                    await cards.health.splice(iHealth, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Хобби':
                if (this.state.cards.hobbies.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iHobby = Math.round(Math.random() * (cards.hobbies.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].hobby = cards.hobbies[iHobby];
                    await cards.hobbies.splice(iHobby, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Багаж':
                if (this.state.cards.baggage.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iBaggage = Math.round(Math.random() * (cards.baggage.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].baggage = cards.baggage[iBaggage];
                    await cards.baggage.splice(iBaggage, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Черта характера':
                if (this.state.cards.character.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iCharacter = Math.round(Math.random() * (cards.character.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].character = cards.character[iCharacter];
                    await cards.character.splice(iCharacter, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Доп. информация':
                if (this.state.cards.info.length < 1)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        iInfo = Math.round(Math.random() * (cards.info.length - 1)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));

                    userCards[index].info = cards.info[iInfo];
                    await cards.info.splice(iInfo, 1);

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
            case 'Все характеристики':
                if (this.state.cards.gender.length < 1 ||
                    this.state.cards.professions.length < 1 ||
                    this.state.cards.phobias.length < 1 ||
                    this.state.cards.health.length < 1 ||
                    this.state.cards.hobbies.length < 1 ||
                    this.state.cards.baggage.length < 1 ||
                    this.state.cards.character.length < 1 || this.state.cards.info.length < 1
                    || this.state.cards.actions.length < 2)
                    alert('Для этого действия недостаточно карт в колоде.');
                else {
                    let cards = await JSON.parse(JSON.stringify(this.state.cards)),
                        userCards = await JSON.parse(JSON.stringify(this.state.userCards));
                    let iGender = Math.round(Math.random() * (cards.gender.length - 1)),
                        iProfession = Math.round(Math.random() * (cards.professions.length - 1)),
                        iHealth = Math.round(Math.random() * (cards.health.length - 1)),
                        iPhobia = Math.round(Math.random() * (cards.phobias.length - 1)),
                        iHobby = Math.round(Math.random() * (cards.hobbies.length - 1)),
                        iCharacter = Math.round(Math.random() * (cards.character.length - 1)),
                        iInfo = Math.round(Math.random() * (cards.info.length - 1)),
                        iBaggage = Math.round(Math.random() * (cards.baggage.length - 1)),
                        iAction1 = Math.round(Math.random() * (cards.actions.length - 1)),
                        iAction2, userCard;

                    userCard = {
                        gender: cards.gender[iGender],
                        profession: cards.professions[iProfession],
                        health: cards.health[iHealth],
                        phobia: cards.phobias[iPhobia],
                        hobby: cards.hobbies[iHobby],
                        character: cards.character[iCharacter],
                        info: cards.info[iInfo],
                        baggage: cards.baggage[iBaggage],
                        action1: cards.actions[iAction1],
                    };

                    await cards.gender.splice(iGender, 1);
                    await cards.professions.splice(iProfession, 1);
                    await cards.health.splice(iHealth, 1);
                    await cards.phobias.splice(iPhobia, 1);
                    await cards.hobbies.splice(iHobby, 1);
                    await cards.character.splice(iCharacter, 1);
                    await cards.info.splice(iInfo, 1);
                    await cards.baggage.splice(iBaggage, 1);
                    await cards.actions.splice(iAction1, 1);

                    iAction2 = Math.round(Math.random() * (cards.actions.length - 1));
                    userCard.action2 = cards.actions[iAction2];
                    await cards.actions.splice(iAction2, 1);

                    let childfree = Math.random() * 100,
                        card1 = Math.random() * 100,
                        card2 = Math.random() * 100,
                        card3 = Math.random() * 100,
                        card4 = Math.random() * 100;

                    userCard.childfree = childfree < 20;
                    userCard.card1 = card1 < 3;
                    userCard.card2 = card2 < 3;
                    userCard.card3 = card3 < 3;
                    userCard.card4 = card4 < 3;

                    userCards[index] = userCard;

                    this.setState({
                        cards: cards,
                        userCards: userCards
                    });
                }
                break;
        }

        let userCards = await JSON.parse(JSON.stringify(this.state.userCards));
        let type = 'data:text/plain;charset=utf-8,%EF%BB%BF';
        let text = this.setFileInfo(userCards[index]);
        let base = encodeURIComponent(text);
        let result = type + base;
        document.getElementById(`Игрок${index+1}`).href = result;
        document.getElementById(`Игрок${index+1}`).style.color = 'green';
    }

    async editUserCards() {
        let value = document.getElementById('globalSelect').value,
            res;

        console.log(this.state.cards.gender.length);

        switch(value) {
            case 'Биологические данные': this.state.cards.gender.length < this.state.count ? res = false : res = true; break;
            case 'Профессия': this.state.cards.professions.length < this.state.count ? res = false : res = true; break;
            case 'Фобия': this.state.cards.phobias.length < this.state.count ? res = false : res = true; break;
            case 'Состояние здоровья': this.state.cards.health.length < this.state.count ? res = false : res = true; break;
            case 'Хобби': this.state.cards.hobbies.length < this.state.count ? res = false : res = true; break;
            case 'Багаж': this.state.cards.baggage.length < this.state.count ? res = false : res = true; break;
            default: res = false;
        }

        if(res === false)
            alert('Для этого действия недостаточно карт в колоде.');
        else {
            for(let i=0; i<this.state.count; i++) {
                await this.editUserCard(null, i, value);
            }
            console.log(this.state);
            alert('Файлы перезаписаны');
        }
    }

    handleChangeOpen(e) {
        this.setState({openCards: e.target.checked});
    }

    async catastropheGeneration() {
        if(this.state.catastrophes.description.length < 1) {
            alert('Для этого действия недостаточно карт в колоде');
        }
        else {
            let iDesc = Math.round(Math.random() * (this.state.catastrophes.description.length - 1)),
                iArea = Math.round(Math.random() * (this.state.catastrophes.area.length - 1)),
                iDuration = Math.round(Math.random() * (this.state.catastrophes.duration.length - 1)),
                iStock = Math.round(Math.random() * (this.state.catastrophes.stock.length - 1)),
                iSurvivors = Math.round(Math.random() * (this.state.catastrophes.survivors.length - 1)),
                iStock2 = Math.round(Math.random() * (this.state.catastrophes.stock.length - 1)),
                activeCatastrophe = {
                    description: this.state.catastrophes.description[iDesc].value,
                    area: this.state.catastrophes.area[iArea].value,
                    duration: this.state.catastrophes.duration[iDuration].value,
                    stock: this.state.catastrophes.stock[iStock].value + ', ' +
                        this.state.catastrophes.stock[iStock2].value,
                    survivors: this.state.catastrophes.survivors[iSurvivors].value,
                },
                newCatastrophes = await JSON.parse(JSON.stringify(this.state.catastrophes));

            await newCatastrophes.description.splice(iDesc, 1);

            await this.setState({
                catastrophes: newCatastrophes,
                activeCatastrophe: activeCatastrophe
            });

            let type = 'data:text/plain;charset=utf-8,%EF%BB%BF';
            let text = this.setFileCat(activeCatastrophe);
            let base = encodeURIComponent(text);
            let result = type + base;
            document.getElementById(`Катастрофа`).href = result;
            document.getElementById('Катастрофа').style.color = 'green';
        }
    }

    async randomGeneration(count) {
        let cards = await JSON.parse(JSON.stringify(this.state.cards));

        for(let i = 0; i<count; i++) {
            let iGender = Math.round(Math.random() * (cards.gender.length - 1)),
                iProfession = Math.round(Math.random() * (cards.professions.length - 1)),
                iHealth = Math.round(Math.random() * (cards.health.length - 1)),
                iPhobia = Math.round(Math.random() * (cards.phobias.length - 1)),
                iHobby = Math.round(Math.random() * (cards.hobbies.length - 1)),
                iCharacter = Math.round(Math.random() * (cards.character.length - 1)),
                iInfo = Math.round(Math.random() * (cards.info.length - 1)),
                iBaggage = Math.round(Math.random() * (cards.baggage.length - 1)),
                iAction1 = Math.round(Math.random() * (cards.actions.length - 1)),
                iAction2, userCard;

            userCard = {
                gender: cards.gender[iGender],
                profession: cards.professions[iProfession],
                health: cards.health[iHealth],
                phobia: cards.phobias[iPhobia],
                hobby: cards.hobbies[iHobby],
                character: cards.character[iCharacter],
                info: cards.info[iInfo],
                baggage: cards.baggage[iBaggage],
                action1: cards.actions[iAction1],
            };

            await cards.gender.splice(iGender, 1);
            await cards.professions.splice(iProfession, 1);
            await cards.health.splice(iHealth, 1);
            await cards.phobias.splice(iPhobia, 1);
            await cards.hobbies.splice(iHobby, 1);
            await cards.character.splice(iCharacter, 1);
            await cards.info.splice(iInfo, 1);
            await cards.baggage.splice(iBaggage, 1);
            await cards.actions.splice(iAction1, 1);

            iAction2 = Math.round(Math.random() * (cards.actions.length - 1));
            userCard.action2 = cards.actions[iAction2];
            await cards.actions.splice(iAction2, 1);

            let childfree = Math.random() * 100,
                card1 = Math.random() * 100,
                card2 = Math.random() * 100,
                card3 = Math.random() * 100,
                card4 = Math.random() * 100;

            userCard.childfree = childfree < 20;
            userCard.card1 = card1 < 3;
            userCard.card2 = card2 < 3;
            userCard.card3 = card3 < 3;
            userCard.card4 = card4 < 3;

            await this.setState(function (prevState) {
                return {
                    userCards: prevState.userCards.concat(userCard)
                }
            });

            let type = 'data:text/plain;charset=utf-8,%EF%BB%BF';
            let text = this.setFileInfo(userCard);
            let base = encodeURIComponent(text);
            let result = type + base;
            document.getElementById(`Игрок${i+1}`).href = result;
            document.getElementById(`Игрок${i+1}`).style.color = 'green';
        }

        this.setState({cards: cards});
    }

    render() {
        let context = this;

        return (
            <div className='game'>
                {this.props.type === 'Баланс' ? 'Это еще не готово' :
                    <div style={{padding: '20px'}}>
                        <input id='newGameButton' type='button' value='Новая игра' onClick={(e) => location.reload()}/>
                        <a id='rules' href='#' target='_blank'>
                            <input type='button' value='Правила' style={{marginLeft: '10px'}}/>
                        </a>
                        {
                            this.state.activeCatastrophe !== undefined ?
                                <div>
                                    <i style={{fontSize: '1.1em'}}>{this.state.activeCatastrophe.description}</i><br/><br/>
                                    <div style={{display: 'flex', flexDirection: 'row',
                                        justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                        <div>
                                            <b>Площадь бункера: </b>{this.state.activeCatastrophe.area}<br/>
                                            <b>Продолжительность пребывания в бункере: </b>{this.state.activeCatastrophe.duration}<br/>
                                            <b>Дополнительная комплектация: </b>{this.state.activeCatastrophe.stock}<br/>
                                            <b>Количество выжившего населения при выходе из бункера: </b>{this.state.activeCatastrophe.survivors}<br/>
                                        </div>
                                        <div style={{textAlign: 'right'}}>
                                            <a download={`Катастрофа.txt`} id={`Катастрофа`} href="#"
                                               onClick={(e) => e.target.style.color = 'blue'}>Скачать</a><br/>
                                            <input type='button' value='Изменить катастрофу' onClick={this.catastropheGeneration}/>
                                        </div>
                                    </div>
                                </div>
                                : 'Генерируем катастрофу...'}
                        <hr/>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <input id='openCards' type='checkbox' onChange={this.handleChangeOpen} checked={this.state.openCards}/>
                            <label htmlFor='openCards'>Скрыть карточки игроков</label>
                            <div style={{marginLeft: 'auto', textAlign: 'right'}}>
                                <div style={{marginBottom: '5px'}}>
                                    <select id='globalSelect' style={{marginRight: '10px', height: '21px'}}>
                                        <option>Биологические данные</option>
                                        <option>Профессия</option>
                                        <option>Фобия</option>
                                        <option>Состояние здоровья</option>
                                        <option>Багаж</option>
                                        <option>Хобби</option>
                                    </select>
                                    <input type='button' value='Изменить у ВСЕХ' onClick={this.editUserCards}/>
                                </div>
                                <div>
                                    <select id='exchange1' style={{marginRight: '5px', height: '21px'}}>
                                        {this.state.userCards.map(function (card, index) {
                                            return <option>{index+1}</option>;
                                        })}
                                    </select>-
                                    <select id='exchange2' style={{marginRight: '10px', marginLeft: '5px', height: '21px'}}>
                                        {this.state.userCards.map(function (card, index) {
                                            return <option>{index+1}</option>;
                                        })}
                                    </select>
                                    <select id='exchange' style={{marginRight: '10px', height: '21px'}}>
                                        <option>Биологические данные</option>
                                        <option>Профессия</option>
                                        <option>Фобия</option>
                                        <option>Состояние здоровья</option>
                                        <option>Багаж</option>
                                        <option>Хобби</option>
                                    </select>
                                    <input type='button' value='Поменять' style={{width: '126px'}}
                                           onClick={(e) => this.exchangeInfo(e,
                                               document.getElementById('exchange').value,
                                               document.getElementById('exchange1').value-1,
                                               document.getElementById('exchange2').value-1)}/>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            {
                                this.state.userCards.length > 0 ?
                                    this.state.userCards.map(function (userCard, index) {
                                        return (
                                            <UserCard userCard={userCard} key={index} index={index}
                                                      open={!context.state.openCards} editUserCard={context.editUserCard}/>
                                        );
                                    })
                                    : 'Генерируем карточки игроков...'
                            }
                        </div>
                        <hr/>
                        <div style={{paddingRight: '20px'}}>
                            <textarea placeholder='Для заметок'
                                      style={{minWidth: '100%', maxWidth: '100%', minHeight: '200px', maxHeight: '200px',
                                          overflowY: 'auto', padding: '10px'}}>

                            </textarea>
                        </div>
                    </div>
                }
            </div>
        );
    }
}