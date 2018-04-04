namespace Zwerm {
    namespace Database {
        interface UserEntry {
            botId: string;
            userId: string;
            creation: string;

            channels?: UserChannels;
            route?: string;
            store?: UserStore;
            markup?: UserMarkup;

            lastTransaction: TransactionEntry
            lastTransactionTime: string;
        }

        interface ConversationEntry {
            botUserId: string;
            conversationId: string;
            creation: string;

            store?: ConversationStore;

            expiration?: string;
            lifetime?: number;

            route?: string;

            firstTransaction: TransactionEntry;
            firstTransactionTime: string;
            lastTransaction: TransactionEntry;
            lastTransactionTime: string;
        }

        interface TransactionEntry {
            botUserId: string;
            transactionId: string;
            conversationId: string;
            timestamp: string;

            type: string,
            message: StaMP.Protocol.Messages.StaMPMessage,
            metaMessage?: StaMP.Protocol.Messages.StaMPMessage,

            channel?: TransactionChannel;
            route?: string;

            conversationStore?: ConversationStore;
            markup?: TransactionMarkup;
            model?: TransactionModel;
        }

        interface DataStore {
            [key: string]: any;
        }

        type UserChannels = {
            [key: string]: UserChannel
        };
        type UserChannel = {
            service: string;
            userId?: string;
            store?: ChannelStore;
            markup?: ChannelMarkup;
        };
        type TransactionChannel = {
            id: string,
            service: string
        };

        type UserStore = DataStore;
        type ChannelStore = DataStore;
        type ConversationStore = DataStore;

        type UserMarkup = {
            firstName?: string;
            lastName?: string;
            profilePicUrl?: string;
            timezone?: string;
            language?: string;
            local?: string;
            language?: string;
            email?: string;
            phone?: string;

            conversationCount?: number;
            messageCount?: number;
        }
        type ChannelMarkup = {
            [key: string]: any;
        };
        type TransactionMarkup = {
            lang?: AWS.Comprehend.Language;
            languages?: Array<AWS.Comprehend.Language>;
            entities?: Array<AWS.Comprehend.Entity>;
            keyPhrases?: Array<AWS.Comprehend.KeyPhrase>;
            sentiment?: AWS.Comprehend.Sentiment;
        };

        type TransactionModel = {
            [key: string]: any;
        };

        interface EvaluatedUserKeys {
            userId: string;
            botId: string;
            lastTransactionTIme: string;
        }

        interface EvaluatedTransactionKeys {
            botUserId: string;
            transactionId: string;
            timestamp: string;
        }

        class StaMPTransaction<TypeOfStaMPMessage extends StaMP.Protocol.Messages.StaMPMessage> implements TransactionEntry {
            botUserId: string;
            conversationId: string;
            transactionId: string;
            type: 'StaMP';
            timestamp: string;
            message: TypeOfStaMPMessage;
        }

        /**
         * @deprecated in favor of {@link Zwerm.Database.UserChannels}
         */
        interface ChannelsObject {
            [key: string]: ChannelObject
        }

        /**
         * @deprecated in favor of {@link Zwerm.Database.UserChannel}
         */
        type ChannelObject = {
            label: string;
            service: string;

            userId: string;
            store: ChannelStore;

            [key: string]: any;
        };
    }

    namespace AWS {
        namespace Comprehend {
            type Language = {
                LanguageCode?: string
                Score?: number
            }
            type Entity = {
                BeginOffset?: number;
                EndOffset?: number;
                Score?: number;
                Text?: string;
                Type?: string;
            }
            type KeyPhrase = {
                BeginOffset?: number;
                EndOffset?: number;
                Score?: number;
                Text?: string;
            }
            type Sentiment = {
                Sentiment: string;
                SentimentScore: SentimentScore
            }
            type SentimentScore = {
                Mixed?: number;
                Positive?: number;
                Neutral?: number;
                Negative?: number
            }
        }
    }

    namespace API {
        interface DynamoFilter<Entry> {
            condition: string;
            filter?: string;
            names?: { [key: string]: keyof Entry }
            values?: { [key: string]: string; }
        }

        interface DynamoResult<LastEvaluatedKeyProperties, ResultItemType> {
            Count: number;
            ScannedCount: number;
            LastEvaluatedKey: LastEvaluatedKeyProperties;
            Items: Array<ResultItemType>
        }

        type SortOrder = 'desc' | 'asc';

        interface Team {
            id: number;
            owner_id: number;
            name: string;
            slug: string;
            photo_url: string;
            stripe_id: string;
            current_billing_plan: string;
            vat_id: string;
            trial_ends_at: string;
            created_at: string;
            updated_at: string;
            pivot: {
                user_id: number;
                team_id: number;
                role: string;
            },
            subscriptions: Array;
            tax_rate: number;
        }

        interface User {
            id: number;
            name: string;
            email: string;
            photo_url: string;
            uses_two_factor_auth: boolean;
            country_code: string;
            phone: string;
            two_factor_reset_code: string,
            current_team_id: number;
            stripe_id: string;
            current_billing_plan: string;
            card_brand: string;
            card_last_four: string;
            card_country: string;
            billing_address: string;
            billing_address_line_2: string;
            billing_city: string;
            billing_state: string;
            billing_zip: string;
            billing_country: string;
            vat_id: string;
            extra_billing_information: string;
            trial_ends_at: string;
            last_read_announcements_at: string;
            created_at: string;
            updated_at: string;
            subscriptions: Array,
            owned_teams: Array,
            teams: Array<Team>,
            tax_rate: number;
        }

        interface BotInfo {
            /**
             * The name of this bot.
             */
            name: string;
            /**
             * The id of this bot.
             */
            botId: string;
            /**
             * The name of the team that this bot belongs to.
             */
            team: string;
            /**
             * The canonical url for accessing this bot, that can be used to easily api calls against this specific bot
             *
             * A bots canonical url is made up of their team, followed by their id.
             */
            canonical: string;
            /**
             * Timestamp of when this bot was created at.
             */
            createdAt: string;
            /**
             * Timestamp of when this bot was last updated.
             *
             * A update is considered to be the changing of any of the bots configuration properties.
             */
            updatedAt: string;
        }

        // not needed due to the type, but helps WebStorm until a bug gets fixed
        interface PartialUser {
            id?: number;
            name?: string;
            email?: string;
            photo_url?: string;
            uses_two_factor_auth?: boolean;
            country_code?: string;
            phone?: string;
            two_factor_reset_code?: string,
            current_team_id?: number;
            stripe_id?: string;
            current_billing_plan?: string;
            card_brand?: string;
            card_last_four?: string;
            card_country?: string;
            billing_address?: string;
            billing_address_line_2?: string;
            billing_city?: string;
            billing_state?: string;
            billing_zip?: string;
            billing_country?: string;
            vat_id?: string;
            extra_billing_information?: string;
            trial_ends_at?: string;
            last_read_announcements_at?: string;
            created_at?: string;
            updated_at?: string;
            subscriptions?: Array,
            owned_teams?: Array,
            teams?: Array<Team>,
            tax_rate?: number;
        }

        type PartialUser = Partial<User>
    }
}
