const pl = {
    appName: 'DesignYourFence',
    null: 'Brak',
    send: 'Wyślij',
    close: 'Zamknij',
    add: 'Dodaj',
    start: 'Rozpocznij',
    cancel: 'Anuluj',
    remove: 'Usuń',
    save: 'Zapisz',
    sending: 'Wysyłanie',
    options: 'Opcje',
    edit: 'Edytuj',
    details: 'Szczegóły',
    bricks: {
        one: 'bloczek',
        twoToFour: 'bloczki',
        FiveAndMore: 'bloczków'
    },
    FDObjects: {
        fencePost: 'Słupek',
        fenceSpan: 'Przęsło',
        fenceGate: 'Brama',
        fenceWicket: 'Furtka'
    },
    notifications: {
      created: 'Utworzono pomyślnie!',
      updated: 'Zaktualizowano pomyślnie!',
      deleted: 'Usunięto pomyślnie!',
      error: 'Wystąpił błąd. Kod błędu to :'
    },
    modals: {
        fenceItemCreateFormModal: {
            header: 'Dodawanie pustaka',
        }
    },
    routes: {
        layout: 'Strona główna',
        fenceconfiguration: 'Konfiguracja ogrodzeń'
    },
    views: {
        fenceDesigner: {
            globalSettings: {
                configuration: 'Konfiguracja ogrodzenia',
                sectionWidth: 'Szerokość projektowanego odcinka',
                openMore: 'Pokaż więcej informacji',
                hideMore: 'Ukryj więcej informacji'
            },
            tabMain: {
                disabledRemoveTooltip: 'Można usunąć tylko ostatni obiekt ogrodzenia',
                addGroupOfPostsAndSpans: 'Stwórz grupę słupków i przęseł',
                group: 'Grupa',
                tabGroup: {
                    width: 'Szerokość grupy obiektów',
                    defaultFirstPost: 'Pierwszy słupek',
                    defaultPost: 'Słupki wewnętrzne',
                    defaultLastPost: 'Ostatni słupek',
                    postData: {
                        width: 'Szerokość',
                        height: 'Wysokość'
                    },
                    defaultSpan: 'Przęsła',
                    spanData: {
                        width: 'Szerokość',
                        height: 'Wysokość'
                    }
                },
                tabPost: {
                    tabObject: {
                        height: 'Wysokość słupka (w bloczkach, z daszkiem)',
                        width: 'Szerokość słupka (w bloczkach)'
                    }
                },
                tabSpan: {
                    tabObject: {
                        height: 'Wysokość przęsła (w bloczkach, z daszkiem)',
                        width: 'Szerokość przęsła (w bloczkach)'
                    }
                },
                tabWicket: {
                    tabObject: {
                        width: 'Szerokość furtki'
                    }
                },
                tabGate: {
                    tabObject: {
                        width: 'Szerokość bramy'
                    }
                }
            },
            modals: {
                ModalGroupOfPostsAndSpans: {
                    header: 'Tworzenie grupy słupków i przęseł'
                }
            }
        },
        fenceDesignerBundle: {
            FDObject: {
                form: {
                    defaultWidth: 'Domyślna szerokość',
                    defaultHeight: 'Domyślna wysokość',
                    name: 'Typ obiektu'
                },
                list: {
                    header: 'Lista obiektów',
                    headings: {
                        name: 'Nazwa',
                        defaultWidth: 'Domyślna szerokość',
                        defaultHeight: 'Domyślna wysokość'
                    }
                },
                modals: {
                    form: {
                        header: 'Edycja danych domyślnych obiektu'
                    }
                }
            },
            FDConfiguration: {
                show: {
                    header: 'Konfiguracja ogrodzenia',
                    item: {
                        type: 'Typ',
                        name: 'Nazwa',
                        description: 'Opis'
                    }
                },
                list: {
                    headings: {
                        name: 'Nazwa',
                        description: 'Opis',
                        type: 'Typ'
                    }
                },
                form: {
                    name: 'Nazwa',
                    description: 'Opis',
                    type: 'Typ',
                    defaultSectionWidth: 'Domyślna szerokość odcinka'
                },
                modals: {
                    form: {
                        header: 'Edycja konfiguracji ogrodzenia'
                    }
                }
            },
            FDItem: {
                list: {
                    header: 'Lista elementów',
                    headings: {
                        width: 'Szerokość',
                        height: 'Wysokość',
                        depth: 'Głębokość',
                        weight: 'Waga',
                        itemType: 'Typ'
                    }
                },
                form: {
                    width: 'Szerokość',
                    weight: 'Waga',
                    height: 'Wysokość',
                    depth: 'Głębokość',
                    widthLeft: 'Punkt przecięcia (od lewej)',
                    itemType: 'Typ elementu'
                },
                modals: {
                    form: {
                        header: 'Edycja elementu ogrodzenia'
                    }
                }
            }
        },
        fdConfiguration: {
            list: {
                name: 'Nazwa',
                description: 'Opis',
                type: 'Typ ogrodzenia'
            }
        },
        layout: {
            header: {
                signOut: 'Wyloguj się',
                profile: 'Profil'
            }
        },
        login: {
            login: 'Zaloguj się',
            password: 'Hasło',
            email: 'Adres e-mail',
            header: 'Logowanie',
            wrongData: 'Nieprawidłowe dane logowania',
            logging: 'Logowanie'
        },
        fenceConfiguration: {
            fenceConfigurator: {
                fenceConfigurationList: 'Konfiguracje ogrodzeń w systemie',
                header: 'Konfigurator ogrodzeń',
                info: 'Witaj w konfiguratorze ogrodzeń. Aby możliwe było użycie aplikacji do celu jej przeznaczonego, należy wprowadzić własną konfigurację. Zaopatrz się w katalog własnych produktów i rozpoczniemy podróż przez kilka kroków które umożliwią użytkowanie aplikacji. Kliknij przycisk "Rozpocznij" i zaczynamy!',
                stepOne: {
                    header: 'Krok 1',
                    subheader: 'Wybór podstawowych parametrów ogrodzenia'
                },
                stepTwo: {
                    header: 'Krok 2',
                    subheader: 'Określenie pustaków ogrodzenia'
                },
                stepThree: {
                    header: 'Krok 3',
                    subheader: 'Określenie daszków ogrodzenia'
                },
                summary: {
                    header: 'Podsumowanie',
                    subheader: 'Sprawdź czy wszystko się zgadza i zapisz',
                    stepOne: 'Krok 1',
                    stepTwo: 'Krok 2',
                    stepThree: 'Krok 3',
                    roof: 'Daszek'
                },
                previousStep: 'Poprzedni krok',
                nextStep: 'Następny krok',
                data: {
                    name: 'Nazwa',
                    nameError: 'Wprowadź co najmniej 5 znaków',
                    description: 'Opis',
                    descriptionError: 'Wprowadź co najmniej 15 znaków',
                    fenceType: 'Typ ogrodzenia',
                    blocksData: {
                        block: {
                            width: 'Szerokość',
                            height: 'Wysokość',
                            depth: 'Głębokość'
                        },
                        blockCrushed: {
                            widthLeft: 'Odległość przecięcia od lewej krawędzi pustaka',
                            widthRight: 'Odległość przecięcia od prawej krawędzi pustaka'
                        }
                    }
                },
                blocksOptions: {
                    full: 'Bloczek pełny',
                    crushed: 'Bloczek łupany'
                },
                addNewColor: 'Dodaj kolor',
                colorInfo: 'Wybierz kolor z palety lub dodaj zdjęcie które będzie wykorzystywane jako tekstura wirtualnego ogrodzenia',
                color: {
                    imagePlaceholder: 'Wybierz plik',
                    imagePlaceholder2: 'Upuść tutaj',
                    name: 'Nazwa',
                    displayOptions: {
                        color: 'Kolor',
                        image: 'Tekstura'
                    }
                }
            }
        }
    }
}

export default pl
