import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    async function searchTeatchers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
        
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeatchers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={ [
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Literatura', label: 'Literatura'},
                            {value: 'Filosofia', label: 'Filosofia'},
                            {value: 'Sociologia', label: 'Sociologia'},
                            {value: 'Historia', label: 'História'},
                            {value: 'Geografia', label: 'Geografia'},
                            {value: 'Portugues', label: 'Português'},
                            {value: 'Matematica', label: 'Matemática'},
                            {value: 'Quimica', label: 'Química'},
                            {value: 'Física', label: 'Física'},
                            {value: 'Biologia', label: 'Biologia'},
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => {setWeekday(e.target.value)}}
                        options={ [
                            {value: '0', label: 'Segunda'},
                            {value: '1', label: 'Terça'},
                            {value: '2', label: 'Quarta'},
                            {value: '3', label: 'Quinta'},
                            {value: '4', label: 'Sexta'},
                            {value: '5', label: 'Sábado'},
                            {value: '6', label: 'Domingo'},
                        ]}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}

            </main>
        </div>
    )
}

export default TeacherList;