import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Event from '../components/event';
import SearchBar from '../components/searchBar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SearchPage = () => {
    const events = useSelector((state) => state.event.events);
    const [searchTerm, setSearchTerm] = useState('');
    function parseDate(dateStr) {
        const dateFormats = [
            'yyyy-MM-dd',
            'MM/dd/yyyy',
            'dd-MM-yyyy'
        ];
    
        for (let format of dateFormats) {
            const date = Date.parse(dateStr, format);
            if (!isNaN(date)) {
                return new Date(date);
            }
        }
        return null;
    }
    
    function parseSearchTerm(searchTerm) {
        const locationMatch = searchTerm.match(/\bin:\s*(.+?)(?=(\bfrom:|\bto:|$))/i);
        const fromMatch = searchTerm.match(/\bfrom:\s*(\S+)/i);
        const toMatch = searchTerm.match(/\bto:\s*(\S+)/i);
        const catMatch = searchTerm.match(/\bcat:\s*(\S+)/i);
    
        let location = locationMatch ? locationMatch[1].trim() : "";
        let dateFrom = fromMatch ? parseDate(fromMatch[1]) : null;
        let dateTo = toMatch ? parseDate(toMatch[1]) : null;
        let category = catMatch ? catMatch[1].trim() : "";
    
        let query = searchTerm;
        if (locationMatch) {
            query = query.replace(locationMatch[0], "");
        }
        if (fromMatch) {
            query = query.replace(fromMatch[0], "");
        }
        if (toMatch) {
            query = query.replace(toMatch[0], "");
        }
        if (catMatch) {
            query = query.replace(catMatch[0], "");
        }
    
        query = query.trim();
    
        return { query, location, dateFrom, dateTo, category };
    }
    const { query, location, dateFrom, dateTo, category } = parseSearchTerm(searchTerm);
    const filteredEvents = events?.filter(event => {
        let matchesQuery = query ? event.eventName.toLowerCase().includes(query.toLowerCase()) : true;
        let matchesLocation = location ? event.location.toLowerCase().includes(location.toLowerCase()) : true;
        
        let matchesDate = true;
        if(dateFrom || dateTo) {
            let eventDate = new Date(event.date);
            if(dateFrom) {
                matchesDate = matchesDate && eventDate >= dateFrom;
            }
            if(dateTo) {
                matchesDate = matchesDate && eventDate <= dateTo;
            }
        }

        let matchesCategory = category ? event.category.toLowerCase().includes(category.toLowerCase()) : true;
        
        return matchesQuery && matchesLocation && matchesDate && matchesCategory;
    });
        const { search } = useLocation();
    
    useEffect(() => {
        const params = new URLSearchParams(search);
        const query = params.get('query');
        if (query) {
            setSearchTerm(query.toLowerCase());
        }
    }, [search]);
    
    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    return (
        <>
        <Navbar title={"Search"}/>
        <section className="p-4 md:p-20 gap-5">
            <SearchBar onSearch={handleSearch} />
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredEvents.map((event) => (
                    <Event key={event.id} eventData={event} />
                ))}
            </div>
        </section>
        <Footer />
        </>
    );
}

export default SearchPage;