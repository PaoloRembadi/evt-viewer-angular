import { Injectable, Type } from '@angular/core';
import { AppParser, RdgParser } from './app-parser';
import {
    AdditionParser, DamageParser, DeletionParser, GapParser, LBParser, NoteParser, ParagraphParser, PtrParser, SuppliedParser,
    TermParser, VerseParser, VersesGroupParser, WordParser,
} from './basic-parsers';
import { CharParser, GlyphParser, GParser } from './character-declarations-parser';
import { ChoiceParser } from './choice-parser';
import { SicParser, SurplusParser } from './editorial-parsers';
import { GraphicParser, SurfaceParser, ZoneParser } from './facsimile-parser';
import {
    AbstractParser, CalendarDescParser, CalendarParser, CatRefParser, ChangeParser, ChannelParser, ClassCodeParser, ConstitutionParser,
    CorrectionParser, CorrespActionParser, CorrespContextParser, CorrespDescParser, CreationParser, CRefPatternParser,
    DerivationParser, DomainParser, EditorialDeclParser, EncodingDescParser, FactualityParser,
    HandNoteParser, HandNotesParser, HyphenationParser, InteractionParser, InterpretationParser, KeywordsParser,
    LanguageParser, LangUsageParser, ListChangeParser, ListTransposeParser, NamespaceParser, NormalizationParser,
    ParticDescParser, PreparednessParser, ProfileDescParser, ProjectDescParser, PunctuationParser, PurposeParser,
    QuotationParser, RefsDeclParser, RefStateParser, RenditionParser, RevisionDescParser,
    SamplingDeclParser, SegmentationParser, SettingDescParser, SettingParser, StdValsParser,
    TagsDeclParser, TagUsageParser, TextClassParser, TextDescParser, TransposeParser,
} from './header-parser';
import {
    AccMatParser, AcquisitionParser, AdditionalParser, AdditionsParser, AdminInfoParser,
    AltIdentifierParser, BindingDescParser, BindingParser, CollationParser, CollectionParser, ConditionParser,
    CustEventParser, CustodialHistParser, DecoDescParser, DecoNoteParser, DepthParser, DimensionsParser,
    DimParser, ExplicitParser, FiliationParser, FinalRubricParser, FoliationParser, HandDescParser,
    HeadParser, HeightParser, HistoryParser, IncipitParser, InstitutionParser, LayoutDescParser, LayoutParser,
    LocusGrpParser, LocusParser, MsContentsParser, MsDescParser, MsFragParser, MsIdentifierParser, MsItemParser,
    MsItemStructParser, MsNameParser, MsPartParser, MusicNotationParser, ObjectDescParser, OrigDateParser, OriginParser,
    OrigPlaceParser, PhysDescParser, ProvenanceParser, RecordHistParser, RepositoryParser, RubricParser, ScriptDescParser,
    SealDescParser, SealParser, SourceParser, SummaryParser, SupportDescParser, SupportParser, SurrogatesParser,
    TypeDescParser, TypeNoteParser, WidthParser,
} from './msdesc-parser';
import { NamedEntityRefParser, OrganizationParser, PersonGroupParser, PersonParser, PlaceParser } from './named-entity-parsers';

// tslint:disable-next-line: no-any
export function ParsersDecl(declarations: Array<Type<any>>) {
    // tslint:disable-next-line: no-any
    return (_: any) => {
        return class extends _ {
            declarations = declarations;
        };
    };
}

@Injectable({
    providedIn: 'root',
})
@ParsersDecl([
    AbstractParser,
    AccMatParser,
    AcquisitionParser,
    AdditionalParser,
    AdditionParser,
    AdditionsParser,
    AdminInfoParser,
    AltIdentifierParser,
    AppParser,
    BindingDescParser,
    BindingParser,
    CalendarDescParser,
    CalendarParser,
    CatRefParser,
    ChannelParser,
    ChangeParser,
    CharParser,
    ChoiceParser,
    ClassCodeParser,
    CollationParser,
    CollectionParser,
    ConditionParser,
    ConstitutionParser,
    CorrectionParser,
    CorrespActionParser,
    CorrespContextParser,
    CorrespDescParser,
    CreationParser,
    CRefPatternParser,
    CustEventParser,
    CustodialHistParser,
    DamageParser,
    DecoDescParser,
    DecoNoteParser,
    DeletionParser,
    DepthParser,
    DerivationParser,
    DimensionsParser,
    DimParser,
    DomainParser,
    EditorialDeclParser,
    EncodingDescParser,
    ExplicitParser,
    FactualityParser,
    FiliationParser,
    FinalRubricParser,
    FoliationParser,
    GapParser,
    GlyphParser,
    GParser,
    GraphicParser,
    HandDescParser,
    HandNoteParser,
    HandNotesParser,
    HeadParser,
    HeightParser,
    HistoryParser,
    HyphenationParser,
    IncipitParser,
    InstitutionParser,
    InteractionParser,
    InterpretationParser,
    KeywordsParser,
    LanguageParser,
    LangUsageParser,
    LayoutDescParser,
    LayoutParser,
    LBParser,
    ListTransposeParser,
    ListChangeParser,
    LocusGrpParser,
    LocusParser,
    MsContentsParser,
    MsDescParser,
    MsFragParser,
    MsIdentifierParser,
    MsItemParser,
    MsItemStructParser,
    MsNameParser,
    MsPartParser,
    MusicNotationParser,
    NamedEntityRefParser,
    NamespaceParser,
    NormalizationParser,
    NoteParser,
    ObjectDescParser,
    OrganizationParser,
    OrigDateParser,
    OriginParser,
    OrigPlaceParser,
    ParagraphParser,
    ParticDescParser,
    PersonGroupParser,
    PersonParser,
    PhysDescParser,
    PlaceParser,
    PreparednessParser,
    ProfileDescParser,
    ProjectDescParser,
    ProvenanceParser,
    PtrParser,
    PunctuationParser,
    PurposeParser,
    QuotationParser,
    RdgParser,
    RecordHistParser,
    RefsDeclParser,
    RefStateParser,
    RenditionParser,
    RepositoryParser,
    RevisionDescParser,
    RubricParser,
    SamplingDeclParser,
    ScriptDescParser,
    SealDescParser,
    SealParser,
    SegmentationParser,
    SettingDescParser,
    SettingParser,
    SicParser,
    SourceParser,
    StdValsParser,
    SummaryParser,
    SuppliedParser,
    SupportDescParser,
    SupportParser,
    SurfaceParser,
    SurplusParser,
    SurrogatesParser,
    TagsDeclParser,
    TagUsageParser,
    TermParser,
    TextClassParser,
    TextDescParser,
    TransposeParser,
    TypeDescParser,
    TypeNoteParser,
    VerseParser,
    VersesGroupParser,
    WidthParser,
    WordParser,
    ZoneParser,
])
export class XMLParsers {
}
